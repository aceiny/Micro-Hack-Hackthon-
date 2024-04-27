import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document_Version } from "./document_version.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class DocumentVersionService {
  constructor(
    @InjectModel(Document_Version.name)
    private readonly documentVersionModel: Model<Document_Version>,
  ) {}

  async GetDocumentVersions(DocumentId: ObjectId) {
    return this.documentVersionModel.find({
      Document_Id: DocumentId,
    });
  }
  async CreateNewDocumentVersion(DocumentId: string, Path: string) {
    const lastVersion = await this.documentVersionModel
      .findOne({
        Document_Id: DocumentId,
      })
      .sort({ Version_Number: -1 });
    const newVersionNumber = lastVersion ? lastVersion.Version_Number + 1 : 1;
    const DocumentVersion = await this.documentVersionModel.create({
      Document_Id: DocumentId,
      Version_Number: newVersionNumber,
      Path,
    });
    return DocumentVersion;
  }
}
