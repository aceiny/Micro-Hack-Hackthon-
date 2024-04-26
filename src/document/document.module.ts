import { Module } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Document, DocumentSchema } from "./document.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
