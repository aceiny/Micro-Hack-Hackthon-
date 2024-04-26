import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document as Doc, ObjectId, Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class Document_Version extends Doc {
  @Prop({
    type: Types.ObjectId,
    ref: "Document",
  })
  Document_Id: ObjectId;
  
  @Prop()
  Version_Number: number;

  @Prop()
  Path : string
}

export const Document_VersionSchema =
  SchemaFactory.createForClass(Document_Version);
