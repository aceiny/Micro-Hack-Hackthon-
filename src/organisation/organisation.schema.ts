import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  timestamps: true,
})
export class Organisation extends Document {
  @Prop()
  Name: string;

  @Prop()
  Domain_Name: string;

  @Prop()
  Email: string;

  @Prop()
  Password: string;

  @Prop()
  Number_Of_Employees: number;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
