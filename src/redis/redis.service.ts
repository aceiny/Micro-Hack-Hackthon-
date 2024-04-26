import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redisClient: Redis,
    ) {}

    async GetKey(key: string): Promise<string> {
        return this.redisClient.get(key);
      }
    
    async SetKey(key: string, value: string): Promise<void> {
        await this.redisClient.set(key, value);
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