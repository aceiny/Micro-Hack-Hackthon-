import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document as Doc, ObjectId, Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class Document extends Doc {
  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  Document_Author: ObjectId;
  @Prop()
  FileSize: number;
  @Prop()
  Mimetype : string;
  @Prop()
  Filename : string;
  @Prop()
  Original_Name : string;
  @Prop()
  Encoding : string;
  @Prop()
  Path : string;
  @Prop({
    default : 1
  })
  Current_Version: number;

  @Prop({
    type: Types.ObjectId,
    ref: "Document_Version",
  })
  Document_Versions: ObjectId[];

  @Prop({
    type: Types.ObjectId,
    ref: "Document_Access",
  })
  Document_Access: ObjectId[];
  @Prop({
    type: Types.ObjectId,
    ref: "Organisation",
  })
  Organisation_Id: ObjectId;

  @Prop({
    default : ""
  })
  Text_Path : string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
