import { Module } from '@nestjs/common';
import { AccessControlService } from './access_control.service';
import { AccessControlController } from './access_control.controller';

@Module({
  providers: [AccessControlService],
  controllers: [AccessControlController]
})
export class AccessControlModule {}
