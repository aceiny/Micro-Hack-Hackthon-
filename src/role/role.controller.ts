import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { RoleService } from "./role.service";
import { Organisation } from "src/organisation/organisation.schema";
import { ObjectId } from "mongoose";
import { GetUser } from "src/jwt/get-user.decorator";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/jwt/role.guard";
import { AccountType } from "src/global/global.enums";
import { Roles } from "src/jwt/roles.decorator";
import { CreateRoleDto } from "./role.types";
import { ValidateObjectId } from "src/global/validate.objectid";

@Controller("role")
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ) {}

    @UseGuards(AuthGuard())
    @Get("/:id")
    async GetRoles(@Param("id" , new ValidateObjectId()) OrganisationId: ObjectId){
        return this.roleService.GetRoles(OrganisationId);
    }

    @UseGuards(AuthGuard())
    @UseGuards(RolesGuard)
    @Roles(AccountType.ORGANISATION)
    @UsePipes(ValidationPipe)
    @Post("/create")
    async CreateRole(@Body() RoleDto : CreateRoleDto , @GetUser() Organisation: any) {
        return this.roleService.CreateRole(RoleDto ,Organisation.Id);
    }

}
