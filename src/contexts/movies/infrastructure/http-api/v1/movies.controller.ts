import {
  HttpMethods,
  SwaggerDocs,
} from '@/src/contexts/shared/swagger/api-responses-docs'
import { Endpoint } from '@/src/app/http-api/decorators/configure-endpoint.decorator'
import { CONTROLLERS } from '@/src/app/constants/controllers'
import { Movies } from '@/src/app/database/entities'
import { Controller, Param } from '@nestjs/common'

import { GetMovieByIdRequestDto } from './dtos/requests/get-movie-by-id.dto'
import { GetMovieByIdResponseDto } from './dtos/responses/movie-by-id.dto'
import { MoviesService } from '../../../application/movies-use-case'

@Controller(CONTROLLERS.MOVIES)
export class MoviesController {
  constructor(private readonly moviesUseCase: MoviesService) { }

  @SwaggerDocs({
    dataDto: GetMovieByIdResponseDto,
    isPaginated: false,
    httpMethod: HttpMethods.get,
    errorResponseCodes: [400, 401, 403, 404],
    tags: 'Movies',
    description:
      'Retrieves a movie by its unique identifier. \n\n' +
      'This endpoint returns the complete details of the specified movie. \n\n' +
      'If the movie is not found, a 404 Not Found error will be returned. \n\n',
    summary: 'Get Movie by ID',
    params: { name: 'id', description: 'Movie ID' },
  })
  @Endpoint({
    responseDto: GetMovieByIdResponseDto,
    operation: HttpMethods.get,
    path: ':id',
  })
  async getMovieById(@Param() { id }: GetMovieByIdRequestDto): Promise<Movies> {
    return await this.moviesUseCase.findById({ id })
  }
}
