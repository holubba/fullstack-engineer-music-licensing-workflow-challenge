import { TestingModule, Test } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { TypeOrmModule } from '@nestjs/typeorm'
import { validateSync } from 'class-validator'
import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'

import { CreateMovieResponseDto } from '@/src/contexts/movies/infrastructure/controllers/dtos/responses/create-movie.response.dto'
import { CreateMovieRequestDto } from '@/src/contexts/movies/infrastructure/controllers/dtos/requests/create-movie.request.dto'
import { MoviesRespositoryModule } from '@/src/contexts/movies/infrastructure/repositories/movies.module'
import { MoviesController } from '@/src/contexts/movies/infrastructure/controllers/movies.controller'
import {
  TestTypeOrmConfigModule,
  testDto,
  mockDB,
} from '@/tests/utils/vitest-helpers'
import { MoviesServiceModule } from '@/src/contexts/movies/application/movies.module'
import { APPLICATION_ERRORS } from '@/src/app/common/response-normalizer/errors'
import { seedDb } from '@/tests/utils/seed'

describe('POST: Create Song', () => {
  let controller: MoviesController
  let db: DataSource

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MoviesServiceModule,
        MoviesRespositoryModule,
        TypeOrmModule,
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
      ],
      providers: [MoviesController],
    })
      .overrideModule(TypeOrmModule)
      .useModule(TestTypeOrmConfigModule)
      .compile()

    controller = moduleFixture.get<MoviesController>(MoviesController)
  })

  beforeAll(async () => {
    db = await mockDB()
    await seedDb(db)
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should create movie', async () => {
    const result = await controller.createMovie({
      name: 'Forrest Gump',
    })

    expect(testDto(CreateMovieResponseDto, result)).toEqual({
      createdAt: expect.any(Date),
      name: 'Forrest Gump',
      id: 3,
    })
  })

  it('should throw error because the song already exists', async () => {
    const result = controller.createMovie({
      name: 'Forrest Gump',
    })

    await expect(result).rejects.toMatchObject(
      APPLICATION_ERRORS.MOVIES.FOUND_ERROR,
    )
  })

  it('should return dto errors', async () => {
    const result = plainToInstance(CreateMovieRequestDto, {})
    const errors = validateSync(result)
    expect(errors.length).toBe(1)
    expect(errors[0].constraints).toEqual({
      isNotEmpty: 'name should not be empty',
      isString: 'name must be a string',
    })
  })
})
