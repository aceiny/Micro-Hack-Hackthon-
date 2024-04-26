import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document as Doc, ObjectId, Types } from "mongoose";

@Schema()
export class Access_Control extends Doc {
    @Prop({
        type: Types.ObjectId,
        ref: "Document",
    })
    Document_Id : ObjectId
    @Prop({
        type: Types.ObjectId,
        ref: "Role",
    })
    Role_Id:ObjectId
    @Prop()
    Can_View:boolean
    @Prop()
    Can_Edit:boolean
    @Prop()
    Can_Delete:boolean
    @Prop()
    Can_Approve:boolean
}

export const Access_ControlSchema = SchemaFactory.createForClass(Access_Control);
