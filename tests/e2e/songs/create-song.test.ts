import { TestingModule, Test } from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { TypeOrmModule } from '@nestjs/typeorm'
import { validateSync } from 'class-validator'
import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'

import { CreateSongResponseDto } from '@/src/contexts/songs/infrastructure/controllers/dtos/create-song.response.dto'
import { CreateSongRequestDto } from '@/src/contexts/songs/infrastructure/controllers/dtos/create-song.request.dto'
import { SongsRepositoryModule } from '@/src/contexts/songs/infrastructure/repositories/songs.module'
import { SongsController } from '@/src/contexts/songs/infrastructure/controllers/songs.controller'
import {
  TestTypeOrmConfigModule,
  testDto,
  mockDB,
} from '@/tests/utils/vitest-helpers'
import { SongsServiceModule } from '@/src/contexts/songs/application/songs.module'
import { APPLICATION_ERRORS } from '@/src/app/common/response-normalizer/errors'
import { seedDb } from '@/tests/utils/seed'

describe('POST: Create Song', () => {
  let controller: SongsController
  let db: DataSource

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SongsServiceModule,
        SongsRepositoryModule,
        TypeOrmModule,
        ConfigModule.forRoot({ isGlobal: true, cache: true }),
      ],
      providers: [SongsController],
    })
      .overrideModule(TypeOrmModule)
      .useModule(TestTypeOrmConfigModule)
      .compile()

    controller = moduleFixture.get<SongsController>(SongsController)
  })

  beforeAll(async () => {
    db = await mockDB()
    await seedDb(db)
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should create song', async () => {
    const result = await controller.createSongController({
      duration: '00:01:00',
      name: 'Beautiful Day',
      artistName: 'U2',
    })

    expect(testDto(CreateSongResponseDto, result)).toEqual({
      artistName: 'U2',
      createdAt: expect.any(Date),
      duration: '00:01:00',
      name: 'Beautiful Day',
      id: 3,
    })
  })

  it('should throw error because the song already exists', async () => {
    const result = controller.createSongController({
      duration: '00:01:00',
      name: 'Beautiful Day',
      artistName: 'U2',
    })
    await expect(result).rejects.toMatchObject(
      APPLICATION_ERRORS.SONGS.FOUND_ERROR,
    )
  })

  it('should return dto errors', async () => {
    const result = plainToInstance(CreateSongRequestDto, {})
    const errors = validateSync(result)
    expect(errors.length).toBe(3)
    expect(errors[0].constraints).toEqual({
      isLength: 'name must be longer than or equal to 1 characters',
      isNotEmpty: 'name should not be empty',
      isString: 'name must be a string',
    })
  })
})
