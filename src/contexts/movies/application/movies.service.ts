import { Injectable, Inject } from '@nestjs/common'

import { APPLICATION_ERRORS } from '@/src/app/common/response-normalizer/errors'

import { GetMovieByIdRequestDto } from '../infrastructure/controllers/dtos/requests/get-movie-by-id.dto'
import { MoviesRepository } from '../domain/movies.repository.interface'
import { throwError } from '../../shared/utils/throw-error'
import { Movies } from '../domain/movies.entity'

@Injectable()
export class MoviesService {
  constructor(
    @Inject(MoviesRepository)
    private readonly moviesRepository: MoviesRepository,
  ) { }

  async findById({ id }: GetMovieByIdRequestDto): Promise<Movies> {
    const movie = await this.moviesRepository.findById(id)
    if (!movie) {
      throwError(APPLICATION_ERRORS.MOVIES.NOT_FOUND_ERROR)
    }
    return movie
  }

  async findAll(): Promise<Movies[]> {
    return await this.moviesRepository.findAll()
  }
}
