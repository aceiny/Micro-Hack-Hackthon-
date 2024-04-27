import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User_Role } from "./user_role.schema";
import { Model, ObjectId } from "mongoose";
import { AssignUserRoleDto } from "./user_schema.types";

@Injectable()
export class UserRoleService {
  constructor(
    @InjectModel(User_Role.name)
    private readonly userRoleModel: Model<User_Role>,
  ) {}

  async GetUserRoles(UserID: ObjectId) {
    return this.userRoleModel.find({
      User_Id: UserID,
    });
  }
  async AssignRoleToUser(RoleData: AssignUserRoleDto) {
    const userRoleExist = await this.userRoleModel.findOne({
      User_Id: RoleData.User_Id,
      Role_Id: RoleData.Role_Id,
    });
    if (userRoleExist) {
      throw new ConflictException("Role already assigned to user");
    }

    const userRole = await this.userRoleModel.create(RoleData);
    if (!userRole) {
      throw new InternalServerErrorException("User Role not created");
    }
    return userRole;
  }
}
