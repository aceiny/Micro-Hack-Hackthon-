import { Module } from "@nestjs/common";
import { Redis } from "ioredis";
import { RedisService } from "./redis.service";

@Module({
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: () => {
        return new Redis({
          host: process.env.REDIS_HOST, // Redis server host
          port: 25061, // Redis server port
          username: process.env.REDIS_USERNAME, // Redis username
          password: process.env.REDIS_PASSWORD, // Redis password
          tls: {
            servername: process.env.REDIS_SERVER_NAME, // Redis server hostname
          },
        });
      },
    },
    RedisService,
  ],
  exports: ["REDIS_CLIENT", RedisService],
})
export class RedisModule {}
