import { UseInterceptors } from '@nestjs/common'

import { SerializeInterceptor, ClassConstructor } from '../serializer/serializer'

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
