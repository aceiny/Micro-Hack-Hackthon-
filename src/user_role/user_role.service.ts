import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User_Role } from "./user_role.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRoleService {
    constructor(
        @InjectModel(User_Role.name)
        private readonly userRoleModel: Model<User_Role>,
    ) {}

    async GetUserRoles() {
        return this.userRoleModel.find();
    }
    async AssignRoleToUser() {
        return "CreateUserRole";
    }
}
