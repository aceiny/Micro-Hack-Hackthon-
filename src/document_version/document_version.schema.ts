import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document as Doc, ObjectId, Types } from "mongoose";

@Schema()
export class Document_Version extends Doc {
  @Prop({
    type: Types.ObjectId,
    ref: "Document",
  })
  Document_Id: ObjectId;
  @Prop()
  Version_Number: number;
  /*@Prop()
    Document_Content : Blob*/
}

export const Document_VersionSchema =
  SchemaFactory.createForClass(Document_Version);
