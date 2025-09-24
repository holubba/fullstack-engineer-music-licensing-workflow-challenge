import { INestApplication } from '@nestjs/common'

import { SuccessResponseNormalizerInterceptor } from '../common/response-normalizer/success-response-normalizer.interceptor'

export const setupInterceptors = (app: INestApplication) => {
  app.useGlobalInterceptors(app.get(SuccessResponseNormalizerInterceptor))
}
