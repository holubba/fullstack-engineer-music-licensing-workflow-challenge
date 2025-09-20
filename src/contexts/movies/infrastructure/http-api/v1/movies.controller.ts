import {
  HttpMethods,
  SwaggerDocs,
} from '@/src/contexts/shared/swagger/api-responses-docs'
import { Endpoint } from '@/src/app/http-api/decorators/configure-endpoint.decorator'
import { NotFoundException, Controller, Param } from '@nestjs/common'
import { Movies } from '@/src/app/database/entities'
import { EntityNotFoundError } from 'typeorm'

import { GetMovieByIdRequestDto } from './dtos/requests/get-movie-by-id.dto'
import { MovieByIdResponseDto } from './dtos/responses/movie-by-id.dto'
import { MoviesService } from '../../../application/movies-use-case'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesUseCase: MoviesService) { }

  @SwaggerDocs({
    dataDto: MovieByIdResponseDto,
    isPaginated: false,
    httpMethod: HttpMethods.get,
    errorResponseCodes: [400, 401, 403, 404],
    tags: 'Movies',
    // TODO: Write this description
    description:
      'Retrieves a movie by its unique identifier. \n\n' +
      'This endpoint returns the complete details of the specified movie. \n\n' +
      'If the survey is not found, a 404 Not Found error will be returned. \n\n',
    summary: 'Get movie by ID',
    params: { name: 'id', description: 'Movie ID' },
  })
  @Endpoint({
    responseDto: GetMovieByIdRequestDto,
    operation: HttpMethods.get,
    path: ':id',
  })
  async getMovieById(@Param() { id }: GetMovieByIdRequestDto): Promise<Movies> {
    try {
      return await this.moviesUseCase.findById({ id })
    } catch (error) {
      if (
        error instanceof EntityNotFoundError &&
        JSON.stringify(error.message).includes('Movies')
      ) {
        throw new NotFoundException(
          'The movie with the specified ID was not found in the database',
        )
      }
      throw error
    }
  }
}
