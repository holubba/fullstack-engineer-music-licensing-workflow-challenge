import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Songs } from '@/src/app/database/entities'

import { SongsRepository } from '../../domain/songs.repository'

@Injectable()
export class SongsRepositoryImpl implements SongsRepository {
  constructor(
    @InjectRepository(Songs)
    private readonly songsRepository: Repository<Songs>,
  ) {}

  async findById(id: number): Promise<Songs | null> {
    return this.songsRepository.findOne({
      where: { id },
    })
  }
}
