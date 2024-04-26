import { Module } from "@nestjs/common";
import { AccessControlService } from "./access_control.service";
import { AccessControlController } from "./access_control.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/user.schema";
import { Access_Control, Access_ControlSchema } from "./access_controle.schema";
import { JWTModule } from "src/jwt/jwt.module";
import { User_Role, User_RoleSchema } from "src/user_role/user_role.schema";

@Module({
  imports : [
    MongooseModule.forFeature([
      { name: Access_Control.name, schema: Access_ControlSchema },
    ]),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
    MongooseModule.forFeature([
      { name: User_Role.name, schema: User_RoleSchema },
    ]),
    JWTModule
  ],
  providers: [AccessControlService],
  controllers: [AccessControlController],
})
export class AccessControlModule {}
