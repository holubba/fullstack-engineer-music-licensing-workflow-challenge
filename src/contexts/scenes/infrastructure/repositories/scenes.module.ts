import { Scenes } from '@/src/app/database/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { ScenesRepository } from '../../domain/scenes.repository'
import { ScenesRepositoryImpl } from './scenes.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Scenes])],
  providers: [
    {
      provide: ScenesRepository,
      useClass: ScenesRepositoryImpl,
    },
  ],
  exports: [ScenesRepository],
})
export class ScenesRespositoryModule { }
