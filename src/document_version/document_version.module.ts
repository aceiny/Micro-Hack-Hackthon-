import { Module } from '@nestjs/common';
import { DocumentVersionController } from './document_version.controller';
import { DocumentVersionService } from './document_version.service';

@Module({
  controllers: [DocumentVersionController],
  providers: [DocumentVersionService]
})
export class DocumentVersionModule {}
