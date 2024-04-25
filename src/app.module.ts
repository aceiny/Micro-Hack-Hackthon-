import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
require('dotenv').config()
@Module({
  imports: [
     MongooseModule.forRoot(process.env.MONGO_URI) , 
     AuthModule,
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
