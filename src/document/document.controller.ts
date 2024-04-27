import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { MulterModule, FilesInterceptor } from "@nestjs/platform-express";
import * as multer from "multer";
import { DocumentService } from "./document.service";
import { multerOptions } from "src/global/multer.options";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/jwt/get-user.decorator";
import { ObjectId, isValidObjectId } from "mongoose";
import { ValidateObjectId } from "src/global/validate.objectid";
@Controller("document")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}
  @Get("")
  GetDocuments() {
    return "Get All Documents";
  }
  @UseGuards(AuthGuard())
  @Post("upload")
  @UseInterceptors(FilesInterceptor("files", null, multerOptions))
  async uploadStructuredFiles(
    @UploadedFiles() files: any,
    @GetUser() User: any,
  ) {
    if (!files) {
      throw new BadRequestException("no files included");
    }
    console.log(files[0]);
    return this.documentService.uploadFiles(files, User.Id, User.Role);
  }
  /*@Get('download/:id')
    async downloadFiles(@Res() res : any , @Param('id' , new ValidateObjectId() ) DocumentId: ObjectId) {
        return this.documentService.DownloadFiles(res , DocumentId)
    }*/
}
