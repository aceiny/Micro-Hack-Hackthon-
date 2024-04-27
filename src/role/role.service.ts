import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Role } from "./role.schema";
import { Model, ObjectId } from "mongoose";
import { CreateRoleDto } from "./role.types";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}
  async GetRoles(OrganisationID: ObjectId): Promise<Role[]> {
    return this.roleModel.find({ Organisation_Id: OrganisationID });
  }

  async CreateRole(
    RoleDto: CreateRoleDto,
    OrganisationID: ObjectId,
  ): Promise<Role> {
    const exist = await this.roleModel.findOne({
      Role_Name: RoleDto.Role_Name,
      Organisation_Id: OrganisationID,
    });
    if (exist) {
      throw new ConflictException("Role already exist");
    }
    const role = this.roleModel.create({
      ...RoleDto,
      Organisation_Id: OrganisationID,
    });
    if (!role) {
      throw new InternalServerErrorException("Role not created");
    }
    console.log(role);
    return role;
  }
}
