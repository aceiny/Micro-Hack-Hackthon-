import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from "mongoose";

@Schema({
  timestamps: true,
})
export class User_Role extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: "User",
  })
  User_Id: ObjectId;
  @Prop({
    type: Types.ObjectId,
    ref: "Role",
  })
  Role_Id: ObjectId;
}

export const User_RoleSchema = SchemaFactory.createForClass(User_Role);
