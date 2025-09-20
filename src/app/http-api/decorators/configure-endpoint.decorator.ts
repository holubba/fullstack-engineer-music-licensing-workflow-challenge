import {
  applyDecorators,
  UseInterceptors,
  HttpCode,
  Delete,
  Patch,
  Post,
  Get,
  Put,
} from '@nestjs/common'
import { SerializeInterceptor } from '@/src/contexts/shared/serializer/serializer'
import { ClassConstructor } from 'class-transformer'

interface CustomDecoratorOptions {
  operation: 'post' | 'get' | 'put' | 'delete' | 'patch'
  responseDto?: ClassConstructor<object>
  isPaginated?: boolean
  path?: string
  hasFile?: boolean
}

export function Endpoint({
  responseDto,
  operation,
  path,
  isPaginated = false,
}: CustomDecoratorOptions) {
  const operationsMap = {
    post: Post,
    get: Get,
    put: Put,
    delete: Delete,
    patch: Patch,
  }

  const decorators = [operationsMap[operation](path)]

  if (responseDto) {
    decorators.push(
      UseInterceptors(new SerializeInterceptor(responseDto, isPaginated)),
    )
  } else {
    decorators.push(HttpCode(204))
  }

  return applyDecorators(...decorators)
}
