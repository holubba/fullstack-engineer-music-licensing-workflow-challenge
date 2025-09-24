import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'

import { CustomApiOkResponse } from '@/src/contexts/shared/swagger/api-responses-docs'
import { Serialize } from '@/src/contexts/shared/custom-decorators/serializer'

import { CONTROLLERS } from '../../constants/controllers'
import { HealthCheckResponseDto } from './health.dto'
import { TAGS } from '../../constants/tags'

@Controller(CONTROLLERS.HEALTH)
export class HealthController {
  @ApiTags(TAGS.HEALTH)
  @ApiOperation({
    summary: 'Health Check',
    description:
      'Returns the current status and uptime of the service. \n\n' +
      'Can be used to verify if the service is running properly. \n\n',
  })
  @CustomApiOkResponse(HealthCheckResponseDto)
  @Serialize(HealthCheckResponseDto)
  @Get()
  run() {
    return { status: 'ok', uptime: process.uptime() }
  }
}
