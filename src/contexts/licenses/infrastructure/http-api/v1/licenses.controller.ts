import {
  HttpMethods,
  SwaggerDocs,
} from '@/src/contexts/shared/swagger/api-responses-docs'
import { Endpoint } from '@/src/app/http-api/decorators/configure-endpoint.decorator'
import { CONTROLLERS } from '@/src/app/constants/controllers'
import { Controller, Param, Body } from '@nestjs/common'
import { Licenses } from '@/src/app/database/entities'
import { TAGS } from '@/src/app/constants/tags'

import { UpdateLicenseStatusParamsDto } from './dtos/requests/update-license-params.requests.dto'
import { UpdateLicenseStatusRequestDto } from './dtos/requests/update-license-status.dto'
import { UpdateLicenseByIdResponseDto } from './dtos/responses/update-license.dto'
import { LicensesService } from '../../../application/licenses.service'

@Controller(CONTROLLERS.LICENSES)
export class LicensesController {
  constructor(private readonly licenseService: LicensesService) { }

  @SwaggerDocs({
    dataDto: UpdateLicenseByIdResponseDto,
    isPaginated: false,
    httpMethod: HttpMethods.patch,
    errorResponseCodes: [400, 404],
    tags: TAGS.LICENSES,
    description:
      'Updates the status of an existing license.\n\n' +
      'This endpoint allows changing the license status (e.g., pending → approved).\n\n' +
      'When the status is updated, a license history record is automatically created to track the change.\n\n' +
      'If the license with the specified ID does not exist, a 404 Not Found error will be returned.\n\n' +
      'If the provided status value is invalid, a 400 Bad Request error will be returned.',
    summary: 'Update License Status',
    params: { name: 'id', description: 'License ID to update' },
  })
  @Endpoint({
    responseDto: UpdateLicenseByIdResponseDto,
    operation: HttpMethods.patch,
    path: ':id/status',
  })
  async updateLicense(
    @Param() { id }: UpdateLicenseStatusParamsDto,
    @Body() { status }: UpdateLicenseStatusRequestDto,
  ): Promise<Licenses> {
    return await this.licenseService.update({ id, status })
  }
}
