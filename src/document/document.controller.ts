import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { DocumentService } from "./document.service";
import { multerOptions } from "src/global/multer.options";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/jwt/get-user.decorator";
import { ObjectId } from "mongoose";
import { ValidateObjectId } from "src/global/validate.objectid";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Document")
@Controller("document")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}
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

  @Get("/:OrganisationID")
  async GetAllOrganisationFiles(
    @Param("OrganisationID", new ValidateObjectId()) OrganisationId: ObjectId,
  ) {
    return this.documentService.GetAllOrganisationFiles(OrganisationId);
  }
  @Get("/one/:DocumentId")
  async GetDocument(
    @Param("DocumentId", new ValidateObjectId()) DocumentId: ObjectId,
  ) {
    return this.documentService.GetDocument(DocumentId);
  }
}
