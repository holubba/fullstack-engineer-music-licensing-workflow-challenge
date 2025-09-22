import { LicenseHistory } from '@/src/app/database/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { LicenseHistoryRepository } from '../domain/license-history.repository'
import { LicenseHistoryRepositoryImpl } from './license-history.repository'

@Module({
  imports: [TypeOrmModule.forFeature([LicenseHistory])],
  providers: [
    {
      provide: LicenseHistoryRepository,
      useClass: LicenseHistoryRepositoryImpl,
    },
  ],
  exports: [LicenseHistoryRepository],
})
export class LicenseHistoryRespositoryModule { }
