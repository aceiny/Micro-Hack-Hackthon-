import { Module } from "@nestjs/common";
import { DocumentVersionController } from "./document_version.controller";
import { DocumentVersionService } from "./document_version.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  Document_Version,
  Document_VersionSchema,
} from "./document_version.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document_Version.name, schema: Document_VersionSchema },
    ]),
  ],
  controllers: [DocumentVersionController],
  providers: [DocumentVersionService],
  exports : [DocumentVersionService]
})
export class DocumentVersionModule {}
