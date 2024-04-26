import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document, ObjectId, Types } from "mongoose";

@Schema()
export class Role extends Document {
  @Prop({
    type : Types.ObjectId,
    ref : "Organisation"
  })
  Organisation_Id:ObjectId
  @Prop()
  Role_Name:string
  @Prop()
  Description:string
}

export const RoleSchema = SchemaFactory.createForClass(Role);
