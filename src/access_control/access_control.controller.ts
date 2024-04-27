import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Access_Control } from "./access_controle.schema";
import { AccessControlService } from "./access_control.service";
import { ObjectId, isValidObjectId } from "mongoose";
import { ValidateObjectId } from "src/global/validate.objectid";
import { AssignAccessControl } from "./access_controle.types";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("Access Control")
@Controller("access-control")
export class AccessControlController {
  constructor(private readonly accesscontrolService: AccessControlService) {}

  @Get("/:user/:document")
  async CheckUserAccess(
    @Param("user", new ValidateObjectId()) UserId: ObjectId,
    @Param("document", new ValidateObjectId()) DocumentId: ObjectId,
  ) {
    return this.accesscontrolService.CheckUserAcces(UserId, DocumentId);
  }

  @Get("/:document")
  async GetAllRolesThatHaveAccess(
    @Param("document", new ValidateObjectId()) DocumentId: ObjectId,
  ) {
    return this.accesscontrolService.GetAllRolesThatHaveAccess(DocumentId);
  }
  @Post("/:document")
  async GiveAccess(
    @Param("document", new ValidateObjectId()) DocumentId: ObjectId,
    @Body() Data: AssignAccessControl,
  ) {
    return this.accesscontrolService.GiveAccess(DocumentId, Data);
  }
  @Post("/:document/:role/block")
  async BlockAccess(
    @Param("document", new ValidateObjectId()) DocumentId: ObjectId,
    @Param("role", new ValidateObjectId()) RoleId: ObjectId,
  ) {
    return this.accesscontrolService.BlockAccess(DocumentId, RoleId);
  }
}
