import { LicenseStatus } from "@/src/app/database/entities/types/types"

export type LicenseStatusEvent = {
  licenseId: number
  newStatus: LicenseStatus
  updatedAt: Date
}
