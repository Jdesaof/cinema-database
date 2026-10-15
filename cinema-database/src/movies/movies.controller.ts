import { Body, Controller, Get, Post } from '@nestjs/common';
import { MoviesService } from './movies.service.js';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Post()
  createMovie(
    @Body()
    body: {
      title: string;
      durationMinutes: number;
      releaseDate: string;
      ageRating: string;
      language: string;
      country: string;
    },
  ) {
    return this.moviesService.createMovie(body);
  }
}