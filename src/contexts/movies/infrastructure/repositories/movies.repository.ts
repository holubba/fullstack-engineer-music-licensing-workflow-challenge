import { Movies } from '@/src/app/database/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { MoviesRepository } from '../../domain/movies.repository'

@Injectable()
export class MoviesRepositoryImpl implements MoviesRepository {
  constructor(
    @InjectRepository(Movies)
    private readonly moviesRepository: Repository<Movies>,
  ) { }

  async findById(id: number): Promise<Movies> {
    console.log(id, await this.moviesRepository.count())
    return {
      id: 1,
      name: 'El Camino',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }
}
