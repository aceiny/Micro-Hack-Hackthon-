import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { ValidateObjectId } from "src/global/validate.objectid";
import { DocumentVersionService } from "./document_version.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("document-version")
export class DocumentVersionController {
  constructor(
    private readonly documentVersionService: DocumentVersionService,
  ) {}

  @Get("/:document")
  @UseGuards(AuthGuard())
  async GetDocumentVersions(
    @Param("document", new ValidateObjectId()) DocumentId: ObjectId,
  ) {
    return this.documentVersionService.GetDocumentVersions(DocumentId);
  }
}
