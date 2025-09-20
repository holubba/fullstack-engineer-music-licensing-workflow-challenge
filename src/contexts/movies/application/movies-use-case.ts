import { Movies } from '@/src/app/database/entities'
import { Injectable, Inject } from '@nestjs/common'

import { GetMovieByIdRequestDto } from '../infrastructure/http-api/v1/dtos/requests/get-movie-by-id.dto'
import { MoviesRepositoryImpl } from '../infrastructure/repositories/movies.repository'
import { MoviesRepository } from '../domain/movies.repository'

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MoviesRepository)
    private readonly moviesRepository: MoviesRepositoryImpl,
  ) { }

  async findById({ id }: GetMovieByIdRequestDto): Promise<Movies> {
    const survey = await this.moviesRepository.findById(id)
    return survey
  }
}
