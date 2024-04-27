import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserRoleService } from "./user_role.service";
import { AssignUserRoleDto } from "./user_schema.types";
import { Roles } from "src/jwt/roles.decorator";
import { RolesGuard } from "src/jwt/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { AccountType } from "src/global/global.enums";
import { GetUser } from "src/jwt/get-user.decorator";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("User-Role")
@Controller("user-role")
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}
  @Get()
  @UseGuards(AuthGuard())
  async GetUserRoles(@GetUser() User: any) {
    return this.userRoleService.GetUserRoles(User.Id);
  }
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @UseGuards(RolesGuard)
  @Roles(AccountType.ORGANISATION)
  async AssignRoleToUser(@Body() RoleData: AssignUserRoleDto) {
    return this.userRoleService.AssignRoleToUser(RoleData);
  }
}
