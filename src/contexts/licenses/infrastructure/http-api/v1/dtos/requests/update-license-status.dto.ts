import { LicenseStatus } from '@/src/app/database/entities/types/types'
import { IsNotEmpty, IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateLicenseStatusRequestDto {
  @IsNotEmpty()
  @IsEnum(LicenseStatus, {
    message: `status must be a valid enum value: ${Object.values(LicenseStatus).join(', ')}`,
  })
  @ApiProperty({
    description: 'License status',
    enum: LicenseStatus,
    example: LicenseStatus.APPROVED,
  })
  status: LicenseStatus
}
