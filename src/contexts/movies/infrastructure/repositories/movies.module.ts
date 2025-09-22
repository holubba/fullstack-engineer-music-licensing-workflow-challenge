import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { Movies } from '@/src/app/database/entities'

import { MoviesRepository } from '../../domain/movies.repository'
import { MoviesRepositoryImpl } from './movies.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  providers: [
    {
      provide: MoviesRepository,
      useClass: MoviesRepositoryImpl,
    },
  ],
  exports: [MoviesRepository],
})
export class MoviesRespositoryModule {}
