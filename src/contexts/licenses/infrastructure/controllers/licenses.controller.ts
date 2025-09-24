import { Controller, Param, Body, Sse } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Observable, Subject, map } from 'rxjs'

import {
  HttpMethods,
  SwaggerDocs,
} from '@/src/contexts/shared/swagger/api-responses-docs'
import { Endpoint } from '@/src/contexts/shared/custom-decorators/configure-endpoint.decorator'
import { LicenseStatus } from '@/src/app/database/entities/types/types'
import { CONTROLLERS } from '@/src/app/constants/controllers'
import { TAGS } from '@/src/app/constants/tags'

import { UpdateLicenseStatusParamsDto } from './dtos/requests/update-license-params.requests.dto'
import { UpdateLicenseStatusRequestDto } from './dtos/requests/update-license-status.dto'
import { UpdateLicenseByIdResponseDto } from './dtos/responses/update-license.dto'
import { LicensesService } from '../../application/licenses.service'
import { Licenses } from '../../domain/licenses.entity'

type LicenseStatusEvent = {
  licenseId: number
  newStatus: LicenseStatus
  updatedAt: Date
}

@Controller(CONTROLLERS.LICENSES)
export class LicensesController {
  constructor(private readonly licenseService: LicensesService) { }
  private licenseStatusChanges$ = new Subject<LicenseStatusEvent>()

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
    const updatedLicense = await this.licenseService.update({ id, status })

    this.licenseStatusChanges$.next({
      licenseId: updatedLicense.id,
      newStatus: updatedLicense.status,
      updatedAt: updatedLicense.updatedAt,
    })

    return updatedLicense
  }

  @Sse('status/stream')
  @ApiOperation({
    tags: [TAGS.LICENSES],
    summary:
      'Subscribe to license status changes | Swagger Try Out is not supported',
    description:
      'Opens a server- sent events(SSE) stream\n\n' +
      'The try out feature is not supported\n\n' +
      'Clients will receive events whenever a license status changes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Stream of license status events',
    content: {
      'text/event-stream': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'object',
              properties: {
                licenseId: { type: 'integer', example: 1 },
                newStatus: { type: 'string', example: LicenseStatus.APPROVED },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
  })
  licenseStatusStream(): Observable<{ data: LicenseStatusEvent }> {
    return this.licenseStatusChanges$
      .asObservable()
      .pipe(map(event => ({ data: event })))
  }
}
