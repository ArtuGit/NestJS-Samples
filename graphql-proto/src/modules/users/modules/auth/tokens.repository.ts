import { Injectable } from '@nestjs/common';
import {
  RedisService,
  DEFAULT_REDIS_NAMESPACE,
} from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class TokensRepository {
  private readonly redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient(DEFAULT_REDIS_NAMESPACE);
  }

  async addToken(key: string, token: string): Promise<void> {
    await this.redisClient.set(
      key,
      token,
      'EX',
      604800, // 7d,
    );
  }

  async getToken(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async removeToken(key: string): Promise<number> {
    return this.redisClient.del(key);
  }
}
