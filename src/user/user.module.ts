import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.schema";
import { JWTModule } from "src/jwt/jwt.module";
import { RedisModule } from "src/redis/redis.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JWTModule,
    RedisModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
