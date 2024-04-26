import { Module } from "@nestjs/common";
import { DocumentService } from "./document.service";
import { DocumentController } from "./document.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Document, DocumentSchema } from "./document.schema";
import { Organisation, OrganisationSchema } from "src/organisation/organisation.schema";
import { User, UserSchema } from "src/user/user.schema";
import { JWTModule } from "src/jwt/jwt.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    JWTModule
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
