import { INestApplication } from '@nestjs/common'

import { API } from '../constants/routes'


export const setupPrefix = (app: INestApplication) => {
  app.setGlobalPrefix(API)
}
