import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Organisation extends Document {
  @Prop()
  Name: string;
  @Prop()
  Domain_Name: string;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
