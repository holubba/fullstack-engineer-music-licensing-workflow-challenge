import { INestApplication } from '@nestjs/common'

import { API } from '../http-api/routes/route.constants'

export const setupPrefix = (app: INestApplication) => {
  app.setGlobalPrefix(API)
}
