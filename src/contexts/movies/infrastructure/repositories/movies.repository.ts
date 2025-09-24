import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { MoviesRepository } from '../../domain/movies.repository'
import { Movies } from '../../domain/movies.entity'

@Injectable()
export class MoviesRepositoryImpl implements MoviesRepository {
  constructor(
    @InjectRepository(Movies)
    private readonly moviesRepository: Repository<Movies>,
  ) { }

  async findById(id: number): Promise<Movies | null> {
    return this.moviesRepository.findOne({
      where: { id },
      relations: {
        scenes: {
          tracks: {
            song: true,
            license: {
              licenseHistory: true,
            },
          },
        },
      },
    })
  }

  async findAll(): Promise<Movies[]> {
    return await this.moviesRepository.find({
      relations: {
        scenes: {
          tracks: {
            song: true,
            license: true,
          },
        },
      },
    })
  }
}
