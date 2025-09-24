import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { ScenesRepository } from '../../domain/scenes.repository'
import { Scenes } from '../../domain/scenes.entity'

@Injectable()
export class ScenesRepositoryImpl implements ScenesRepository {
  constructor(
    @InjectRepository(Scenes)
    private readonly scenesRespository: Repository<Scenes>,
  ) { }

  async findById(id: number): Promise<Scenes | null> {
    return this.scenesRespository.findOne({
      where: { id },
    })
  }
}
