import { UseInterceptors } from '@nestjs/common'

import { SerializeInterceptor, ClassContrustor } from '../serializer/serializer'

export function Serialize(dto: ClassContrustor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}
