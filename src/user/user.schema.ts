import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  Fullname: string;

  @Prop({
    required: true,
  })
  Username: string;

  @Prop()
  Password: string;

  @Prop({
    required: true,
  })
  Email: string;

  @Prop()
  Phone: string;

  @Prop({
    default: true,
  })
  Is_Active: boolean;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: "Organisation",
  })
  Organisation_Id: ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
