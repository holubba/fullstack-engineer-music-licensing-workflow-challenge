import { Module } from '@nestjs/common'

import { ResponseNormalizerModule } from './response-normalizer/response-normalizer.module'

@Module({
  imports: [ResponseNormalizerModule],
})
export class HttpApiModule { }
