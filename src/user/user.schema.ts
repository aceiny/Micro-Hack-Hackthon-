import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from "mongoose";

@Schema()
export class User extends Document {
  @Prop()
  Fullname: string;
  @Prop()
  Username: string;
  @Prop()
  Password: string;
  @Prop()
  Email: string;
  @Prop()
  Phone: string;
  @Prop()
  Is_Active: boolean;
  @Prop({
    type : Types.ObjectId,
    ref : 'Organisation'
  })
  Organisation_Id: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
