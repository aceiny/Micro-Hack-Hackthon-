import { Module } from "@nestjs/common";
import { UserRoleController } from "./user_role.controller";
import { UserRoleService } from "./user_role.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User_Role, User_RoleSchema } from "./user_role.schema";
import { JWTModule } from "src/jwt/jwt.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User_Role.name, schema: User_RoleSchema },
    ]),
    JWTModule,
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
