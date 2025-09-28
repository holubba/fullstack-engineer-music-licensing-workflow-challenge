import { LicenseStatus } from '@/src/app/database/types'

export function generateTransitionErrorMessage({
  from,
  to,
}: {
  from: LicenseStatus
  to: LicenseStatus
}) {
  return `Cannot change license from ${from} to ${to}`
}
