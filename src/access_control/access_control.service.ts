import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Access_Control } from "./access_controle.schema";
import { Model, ObjectId } from "mongoose";
import { User } from "src/user/user.schema";
import { AssignAccessControl } from "./access_controle.types";
import { User_Role } from "src/user_role/user_role.schema";

@Injectable()
export class AccessControlService {
  constructor(
    @InjectModel(Access_Control.name)
    private readonly accesscontrolModel: Model<Access_Control>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(User_Role.name)
    private readonly userroleModel: Model<User_Role>,
  ) {}
  async CheckUserAcces(UserId: ObjectId, DocumentId: ObjectId) {
    const UserRoles = await this.userroleModel.find({
      User_Id: UserId,
    });
    const AccessableRoles = await this.accesscontrolModel.find({
      Document_Id: DocumentId,
    });
    const hasAccess = UserRoles.some((userRole) =>
      AccessableRoles.some(
        (accessControl) =>
          accessControl.Role_Id.toString() === userRole.Role_Id.toString() &&
          !accessControl.Blocked,
      ),
    );
    return hasAccess;
  }
  async GetAllRolesThatHaveAccess(DocumentId: ObjectId) {
    const AccessObj = await this.accesscontrolModel.find({
      Document_Id: DocumentId,
      Blocked: false,
    });
    if (!AccessObj) {
      throw new NotFoundException("This Document is global accessable");
    }
    return AccessObj;
  }
  async GiveAccess(DocumentId: ObjectId, Data: AssignAccessControl) {
    const AccessObj = await this.accesscontrolModel.create({
      ...Data,
      Document_Id: DocumentId,
    });
    if (!AccessObj) {
      throw new InternalServerErrorException("Error while giving access");
    }
    return AccessObj;
  }
  async BlockAccess(DocumentId: ObjectId, RoleId: ObjectId) {
    const AccessObj = await this.accesscontrolModel.create({
      Role_Id: RoleId,
      Document_Id: DocumentId,
      Blocked: true,
    });
    if (!AccessObj) {
      throw new InternalServerErrorException("Error while giving access");
    }
    return AccessObj;
  }
}
