import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RedisService } from '../redis/redis.service.js';

@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async findAll() {
    const cacheKey = 'movies:all';

    const cached = await this.redis.get(cacheKey);

    if (cached !== null) {
      return {
        source: 'redis',
        movies: JSON.parse(cached),
      };
    }

    const movies = await this.prisma.movie.findMany({
      orderBy: { releaseDate: 'desc' },
    });

    const serialized = JSON.stringify(movies, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    );

    await this.redis.set(cacheKey, serialized, 300);

    return {
      source: 'database',
      movies: JSON.parse(serialized),
    };
  }

  async createMovie(data: {
    title: string;
    durationMinutes: number;
    releaseDate: string;
    ageRating: string;
    language: string;
    country: string;
  }) {
    const movie = await this.prisma.movie.create({
      data: {
        title: data.title,
        durationMinutes: data.durationMinutes,
        releaseDate: new Date(data.releaseDate),
        ageRating: data.ageRating,
        language: data.language,
        country: data.country,
      },
    });

    // Clear cache when a new movie is added.
    await this.redis.delete('movies:all');

    return JSON.parse(
      JSON.stringify(movie, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    );
  }
}