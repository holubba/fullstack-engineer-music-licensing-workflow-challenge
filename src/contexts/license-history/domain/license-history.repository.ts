import { LicenseHistory } from '@/src/app/database/entities'

export abstract class LicenseHistoryRepository {
  abstract create(
    licenseHistory: Pick<
      LicenseHistory,
      'licenseId' | 'oldStatus' | 'newStatus'
    >,
  ): Promise<void>
}
