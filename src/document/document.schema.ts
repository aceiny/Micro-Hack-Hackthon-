import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document as Doc, ObjectId, Types } from "mongoose";

@Schema()
export class Document extends Doc {
  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  Document_Author: ObjectId;

  @Prop()
  Document_Description: string;

  @Prop()
  Document_Name: string;

  /*@Prop()
    Document_Content:blob*/
  @Prop()
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
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
