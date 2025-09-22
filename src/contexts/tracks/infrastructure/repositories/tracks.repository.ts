import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { Tracks } from '@/src/app/database/entities'

import { TracksRepository } from '../../domain/tracks.repository'

@Injectable()
export class TracksRepositoryImpl implements TracksRepository {
  constructor(
    @InjectRepository(Tracks)
    private readonly tracksRepository: Repository<Tracks>,
  ) {}

  async findByIdOrFail(id: number): Promise<Tracks> {
    return this.tracksRepository.findOneOrFail({
      where: { id },
      relations: {
        license: true,
      },
    })
  }

  async insert(
    track: Pick<Tracks, 'sceneId' | 'songId' | 'startTime' | 'endTime'>,
  ): Promise<Tracks> {
    return await this.tracksRepository.save(track)
  }
}
