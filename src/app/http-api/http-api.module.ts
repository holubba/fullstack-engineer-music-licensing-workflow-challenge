import { Module } from '@nestjs/common'

import { ResponseNormalizerModule } from './response-normalizer/response-normalizer.module'
import { HealthModule } from './health/health.module'

@Module({
  imports: [HealthModule, ResponseNormalizerModule],
})
export class HttpApiModule {}
