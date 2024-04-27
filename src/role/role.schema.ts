import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class Role extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: "Organisation",
  })
  Organisation_Id: ObjectId;
  @Prop()
  Role_Name: string;
  @Prop()
  Description: string;

  @Prop({
    default: "#FFFFFFF",
  })
  Role_Color: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
