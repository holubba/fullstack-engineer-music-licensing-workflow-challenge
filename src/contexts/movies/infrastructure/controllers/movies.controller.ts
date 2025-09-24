import { Controller, Param } from '@nestjs/common'

import {
  HttpMethods,
  SwaggerDocs,
} from '@/src/contexts/shared/swagger/api-responses-docs'
import { Endpoint } from '@/src/contexts/shared/custom-decorators/configure-endpoint.decorator'
import { CONTROLLERS } from '@/src/app/constants/api.constants'
import { TAGS } from '@/src/app/constants/docs.contants'

import { GetMoviesResponseDto } from './dtos/responses/get-movies.response.dto'
import { GetMovieByIdRequestDto } from './dtos/requests/get-movie-by-id.dto'
import { GetMovieByIdResponseDto } from './dtos/responses/movie-by-id.dto'
import { MoviesService } from '../../application/movies.service'
import { Movies } from '../../domain/movies.entity'

@Controller(CONTROLLERS.MOVIES)
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @SwaggerDocs({
    dataDto: GetMovieByIdResponseDto,
    isPaginated: false,
    httpMethod: HttpMethods.get,
    errorResponseCodes: [400, 404],
    tags: TAGS.MOVIES,
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
    return await this.moviesService.findById({ id })
  }

  @SwaggerDocs({
    dataDto: GetMoviesResponseDto,
    isPaginated: true,
    httpMethod: HttpMethods.get,
    errorResponseCodes: [],
    tags: TAGS.MOVIES,
    description:
      'Retrieves all movies. \n\n' +
      'This should be paginated but due to the time constraints of the challenge and it not being enforced in the description I left it like this',
    summary: 'Retrieves all movies',
  })
  @Endpoint({
    responseDto: GetMoviesResponseDto,
    operation: HttpMethods.get,
  })
  async getMovies(): Promise<Movies[]> {
    return await this.moviesService.findAll()
  }
}
