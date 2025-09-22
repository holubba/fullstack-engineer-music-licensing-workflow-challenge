import { Licenses } from '@/src/app/database/entities'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { LicensesRepository } from '../../domain/licenses.repository'
import { LicensesRepositoryImpl } from './licenses.repository'

@Module({
  imports: [TypeOrmModule.forFeature([Licenses])],
  providers: [
    {
      provide: LicensesRepository,
      useClass: LicensesRepositoryImpl,
    },
  ],
  exports: [LicensesRepository],
})
export class LicensesRespositoryModule { }
