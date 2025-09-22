import { LicenseStatus } from '@/src/app/database/entities/types/types'
import { Licenses } from '@/src/app/database/entities'
import { Transactional } from 'typeorm-transactional'
import { Injectable, Inject } from '@nestjs/common'

import { LicenseHistoryRepositoryImpl } from '../../license-history/repositories/license-history.repository'
import { LicensesRepositoryImpl } from '../../licenses/infrastructure/repositories/licenses.repository'
import { LicenseHistoryRepository } from '../../license-history/domain/license-history.repository'
import { LicensesRepository } from '../../licenses/domain/licenses.repository'

@Injectable()
export class LicensesService {
  constructor(
    @Inject(LicensesRepository)
    private readonly licensesRepository: LicensesRepositoryImpl,
    @Inject(LicenseHistoryRepository)
    private readonly licenseHistoryRepository: LicenseHistoryRepositoryImpl,
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
