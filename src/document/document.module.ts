import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

@Module({
  providers: [DocumentService],
  controllers: [DocumentController]
})
export class DocumentModule {}
