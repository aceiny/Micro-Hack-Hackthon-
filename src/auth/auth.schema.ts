import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop()
  Role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
