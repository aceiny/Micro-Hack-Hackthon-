import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { OrganisationModule } from './organisation/organisation.module';
import { UserModule } from './user/user.module';
import { DocumentService } from './document/document.service';
import { DocumentModule } from './document/document.module';
import { DocumentVersionModule } from './document_version/document_version.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user_role/user_role.module';
import { AccessControlModule } from './access_control/access_control.module';
require('dotenv').config()
@Module({
  imports: [
     MongooseModule.forRoot(process.env.MONGO_URI) , 
     AuthModule, OrganisationModule, UserModule, DocumentModule, DocumentVersionModule, RoleModule, UserRoleModule, AccessControlModule,
    ],
  controllers: [],
  providers: [DocumentService],
})
export class AppModule {}
