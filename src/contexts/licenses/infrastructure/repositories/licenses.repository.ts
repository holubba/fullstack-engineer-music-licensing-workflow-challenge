import { Licenses } from '@/src/app/database/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { LicensesRepository } from '../../domain/licenses.repository'

@Injectable()
export class LicensesRepositoryImpl implements LicensesRepository {
  constructor(
    @InjectRepository(Licenses)
    private readonly licensesRepository: Repository<Licenses>,
  ) { }
  async create(
    license: Pick<Licenses, 'trackId' | 'rightsHolder' | 'status' | 'notes'>,
  ): Promise<Licenses> {
    return await this.licensesRepository.save(license)
  }
}
