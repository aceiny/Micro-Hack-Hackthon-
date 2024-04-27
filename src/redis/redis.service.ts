import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisService {
  constructor(
    @Inject("REDIS_CLIENT")
    private readonly redisClient: Redis,
  ) {}

  async GetKey(key: string): Promise<any> {
    return JSON.parse(await this.redisClient.get(key));
  }

  async SetKey(key: string, value: any): Promise<any> {
    return await this.redisClient.set(key, JSON.stringify(value));
  }

  async KeyExists(key: string): Promise<boolean> {
    const result = await this.redisClient.exists(key);
    return result === 1;
  }
}
/*
document path 
roles 
version controle*/
