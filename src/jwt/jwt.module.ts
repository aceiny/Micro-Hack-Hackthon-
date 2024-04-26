import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { RolesGuard } from "./role.guard";
require("dotenv").config();
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt",
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  controllers: [],
  providers: [JwtStrategy, RolesGuard],
  exports: [JwtStrategy, PassportModule, JwtModule],
})
export class JWTModule {}
