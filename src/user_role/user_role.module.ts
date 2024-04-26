import { Module } from '@nestjs/common';
import { UserRoleController } from './user_role.controller';
import { UserRoleService } from './user_role.service';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService]
})
export class UserRoleModule {}
