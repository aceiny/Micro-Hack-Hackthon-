import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Res,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document } from "./document.schema";
import { Model, ObjectId } from "mongoose";
import * as fs from "fs";
import * as archiver from "archiver";
import path from "path";
import { Organisation } from "src/organisation/organisation.schema";
import { User } from "src/user/user.schema";
import * as unzipper from "unzipper";
import { NotFoundError } from "rxjs";
import { Document_Version } from "src/document_version/document_version.schema";
import { DocumentVersionService } from "src/document_version/document_version.service";
import axios from "axios";
import { FILE } from "dns";
@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name)
    private readonly documentModel: Model<Document>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly documentVersionModel: DocumentVersionService,
  ) {}

  async uploadFiles(files: any, UserId: ObjectId, UserRole: string) {
    let Organisation_Id;
    if (UserRole == "ORGANISATION") {
      Organisation_Id = UserId;
    } else {
      const userObj = await this.userModel.findById(UserId);
      Organisation_Id = userObj.Organisation_Id;
    }
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });
    const ArchiveName = files[0].originalname + "-" + Date.now();
    const output = fs.createWriteStream(`./uploads/${ArchiveName}.zip`);

    archive.on("error", (err) => {
      throw new InternalServerErrorException("something went wrong");
    });

    archive.pipe(output);

    for (const file of files) {
      const Filename = file.filename;
      const Path = `/uploads/${Filename}`;
      const FileSize = file.size / (1024 * 1024);
      const Mimetype = file.mimetype;
      const Encoding = file.encoding;
      const Original_Name = file.originalname;

      archive.append(file.buffer, { name: Original_Name });

      //read pdf file
      if (file.mimetype == "application/pdf") {
        const filePath = "." + Path;

        const fileData = fs.readFileSync(filePath);

        const blob = new Blob([fileData]);

        const formData = new FormData();
        formData.append("pdfs", blob, "file.pdf");

        const res = await axios.post(
          "http://165.232.116.238:5001/get_pdf_text",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        fs.writeFileSync(
          `./uploads/${Filename}-text.txt`,
          JSON.stringify(res.data.text.replace(/\n/g, " ")),
        );
      }
      // end of read pdf from file
      const body = {
        FileSize,
        Mimetype,
        Filename,
        Original_Name,
        Encoding,
        Path,
        Document_Author: UserId,
        Organisation_Id,
        Text_Path: `./uploads/${Filename}-text.txt`,
      };
      const Document = await this.documentModel.create(body);
      console.log(Document);
    }

    await archive.finalize();
    const ArchiveBody = {
      Path: `./uploads/${ArchiveName}.zip`,
      FileSize: output.bytesWritten / (1024 * 1024),
      Mimetype: "application/zip",
      Filename: `${ArchiveName}.zip`,
      Original_Name: `${ArchiveName}.zip`,
      Encoding: "zip",
      Document_Author: UserId,
      Organisation_Id,
      Is_Zip: true,
    };
    const newDocument = await this.documentModel.create(ArchiveBody);
    return newDocument;
  }
  /*async DownloadFiles(res: any, DocumentId: ObjectId) {
        console.log(DocumentId)
        const document = await this.documentModel.findById(DocumentId);
        if (!document) {
            throw new NotFoundException('Document not found');
        }
    
        const zipFileStream = fs.createReadStream(document.Path);
        const downloadFolderPath = './download'; // Adjust this path as needed
        fs.mkdirSync(downloadFolderPath, { recursive: true });
    
        await zipFileStream.pipe(unzipper.Extract({ path: downloadFolderPath })).promise();
    
        // Create a new zip file from the extracted files
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });
    
        // This is the name of the zip file to be downloaded
        res.attachment('download.zip');
    
        // This pipes the archive data to the response
        archive.pipe(res);
    
        fs.readdirSync(downloadFolderPath).forEach((file) => {
            const filePath = path.join(downloadFolderPath, file);
            archive.file(filePath, { name: file });
        });
    
        await archive.finalize();
  }*/
    async GetAllOrganisationFiles(OrganisationId: ObjectId) {
        return this.documentModel.find({
            Organisation_Id : OrganisationId, 
            Is_Zip: false
        }).populate('Document_Author' , '-Password')
    }
    async GetDocument(DocumentId: ObjectId) {
      const document = await this.documentModel.findById(DocumentId).populate('Document_Author' , '-Password')
      if (!document) {
          throw new NotFoundException('Document not found');
      }
      return document;
    }
 }
