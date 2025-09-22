import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { Songs } from '@/src/app/database/entities'

import { SongsRepository } from '../../domain/songs.repository'
import { SongsRepositoryImpl } from './songs.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Songs])],
  providers: [
    {
      provide: SongsRepository,
      useClass: SongsRepositoryImpl,
    },
  ],
  exports: [SongsRepository],
})
export class SongsRespositoryModule {}
