import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Role, RoleSchema } from "./role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
