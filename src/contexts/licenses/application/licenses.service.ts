import { Transactional } from 'typeorm-transactional'
import { Injectable, Inject } from '@nestjs/common'

import { LicenseStatus } from '@/src/app/database/entities/types/types'

import { LicenseHistoryRepository } from '../../license-history/domain/license-history.repository'
import { LicensesRepository } from '../../licenses/domain/licenses.repository'
import { Licenses } from '../domain/licenses.entity'

@Injectable()
export class LicensesService {
  constructor(
    @Inject(LicensesRepository)
    private readonly licensesRepository: LicensesRepository,
    @Inject(LicenseHistoryRepository)
    private readonly licenseHistoryRepository: LicenseHistoryRepository,
  ) { }

  @Transactional()
  async update(input: {
    id: number
    status: LicenseStatus
  }): Promise<Licenses> {
    const license = await this.licensesRepository.findOneByIdOrFail(input.id)

    await this.licensesRepository.update(input)

    await this.licenseHistoryRepository.create({
      licenseId: input.id,
      oldStatus: license.status,
      newStatus: input.status,
    })

    return await this.licensesRepository.findOneByIdOrFail(input.id)
  }
}
