import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { JWTModule } from "src/jwt/jwt.module";
import { RedisModule } from "src/redis/redis.module";
import { Organisation, OrganisationSchema } from "src/organisation/organisation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),
    JWTModule,
    RedisModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
