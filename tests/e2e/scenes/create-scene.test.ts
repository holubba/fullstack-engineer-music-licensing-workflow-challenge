import { TestingModule, Test } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { TypeOrmModule } from '@nestjs/typeorm'
import { validateSync } from 'class-validator'
import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'

import { CreateSceneResponseDto } from '@/src/contexts/scenes/infrastructure/controllers/dtos/responses/create-scene.response.dto'
import { CreateSceneRequestDto } from '@/src/contexts/scenes/infrastructure/controllers/dtos/requests/create-scene.request.dto'
import { ScenesRespositoryModule } from '@/src/contexts/scenes/infrastructure/repositories/scenes.module'
import { MoviesRespositoryModule } from '@/src/contexts/movies/infrastructure/repositories/movies.module'
import { ScenesController } from '@/src/contexts/scenes/infrastructure/controllers/scenes.controller'
import {
  TestTypeOrmConfigModule,
  testDto,
  mockDB,
} from '@/tests/utils/vitest-helpers'
import { ScenesServiceModule } from '@/src/contexts/scenes/application/scenes.module'
import { APPLICATION_ERRORS } from '@/src/app/common/response-normalizer/errors'
import { seedDb } from '@/tests/utils/seed'

describe('POST: Create Scene', () => {
  let controller: ScenesController
  let db: DataSource

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ScenesServiceModule,
        ScenesRespositoryModule,
        MoviesRespositoryModule,
        TypeOrmModule,
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
      ],
      providers: [ScenesController],
    })
      .overrideModule(TypeOrmModule)
      .useModule(TestTypeOrmConfigModule)
      .compile()

    controller = moduleFixture.get<ScenesController>(ScenesController)
  })

  beforeAll(async () => {
    db = await mockDB()
    await seedDb(db)
  })

  it('should create scenes', async () => {
    const result = await controller.createScene({
      movieId: 1,
      name: 'Neo Chooses the Red Pill',
    })
    expect(result).toBeDefined()

    expect(testDto(CreateSceneResponseDto, result)).toEqual({
      createdAt: expect.any(Date),
      id: 3,
      movieId: 1,
      name: 'Neo Chooses the Red Pill',
    })
  })

  it('should reject on non existant movie', async () => {
    const result = controller.createScene({
      movieId: 255,
      name: 'Neo Chooses the Red Pill',
    })
    await expect(result).rejects.toMatchObject(
      APPLICATION_ERRORS.MOVIES.NOT_FOUND_ERROR,
    )
  })

  it('should reject invalid body', async () => {
    const result = plainToInstance(CreateSceneRequestDto, {})
    const errors = validateSync(result)
    expect(errors.length).toBe(2)
    expect(errors[0].constraints).toEqual({
      isInt: 'movieId must be an integer number',
      isPositive: 'movieId must be a positive number',
    })
  })
})
