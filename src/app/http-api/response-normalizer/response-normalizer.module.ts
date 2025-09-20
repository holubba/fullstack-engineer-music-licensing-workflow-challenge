import { Module } from '@nestjs/common'

import { SuccessResponseNormalizerInterceptor } from './success-response-normalizer.interceptor'
import { ErrorResponseNormalizerFilter } from './error-response-normalizer.filter'

@Module({
  providers: [
    SuccessResponseNormalizerInterceptor,
    ErrorResponseNormalizerFilter,
  ],
  exports: [
    SuccessResponseNormalizerInterceptor,
    ErrorResponseNormalizerFilter,
  ],
})
export class ResponseNormalizerModule {}
