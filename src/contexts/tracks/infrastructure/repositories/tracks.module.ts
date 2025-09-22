import { Tracks } from '@/src/app/database/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { TracksRepository } from '../../domain/tracks.repository'
import { TracksRepositoryImpl } from './tracks.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Tracks])],
  providers: [
    {
      provide: TracksRepository,
      useClass: TracksRepositoryImpl,
    },
  ],
  exports: [TracksRepository],
})
export class TracksRespositoryModule { }
