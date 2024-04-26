import { Module } from "@nestjs/common";
import { UserRoleController } from "./user_role.controller";
import { UserRoleService } from "./user_role.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User_Role, User_RoleSchema } from "./user_role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User_Role.name, schema: User_RoleSchema },
    ]),
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
})
export class UserRoleModule {}
