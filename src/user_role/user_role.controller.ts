import { Controller, Get, Post } from "@nestjs/common";
import { UserRoleService } from "./user_role.service";

@Controller("user-role")
export class UserRoleController {
    constructor(
        private readonly userRoleService: UserRoleService,
    ) {}
    @Get()
    async GetUserRoles() {
        return this.userRoleService.GetUserRoles();
    }
    @Post() 
    async AssignRoleToUser() {
        return this.userRoleService.AssignRoleToUser();
    }
}
