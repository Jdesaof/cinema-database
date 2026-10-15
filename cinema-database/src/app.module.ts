import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module.js';
import { MoviesController } from './movies/movies.controller.js';
import { MoviesService } from './movies/movies.service.js';
import { RedisService } from './redis/redis.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [MoviesController],
  providers: [MoviesService, RedisService],
})
export class AppModule {}