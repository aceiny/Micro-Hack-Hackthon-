import { ApiProperty } from "@nestjs/swagger";
import { ObjectId } from "mongoose";

export class AssignAccessControl {
  @ApiProperty()
  Role_Id: ObjectId;
  @ApiProperty()
  Can_View: boolean;
  @ApiProperty()
  Can_Edit: boolean;
  @ApiProperty()
  Can_Delete: boolean;
  @ApiProperty()
  Can_Approve: boolean;
}
