import { Module } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Document, DocumentSchema } from "./document.schema";
import { User, UserSchema } from "src/user/user.schema";
import { JWTModule } from "src/jwt/jwt.module";
import { DocumentVersionModule } from "src/document_version/document_version.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JWTModule,
    DocumentVersionModule,
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
