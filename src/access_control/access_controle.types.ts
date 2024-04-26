import { ObjectId } from "mongoose";

export class AssignAccessControl {
  Role_Id: ObjectId;
  Can_View: boolean;
  Can_Edit: boolean;
  Can_Delete: boolean;
  Can_Approve: boolean;
}
