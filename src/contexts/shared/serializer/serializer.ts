import { ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { PageSerializeDto, PageDto } from '../pagination/page-dto'

/**
 * Constructor type for a class.
 */
export interface ClassConstructor {
  new(...args: unknown[]): object
}

/**
 * Interceptor that serializes outgoing responses using a DTO.
 * Can handle single objects or paginated results.
 */
export class SerializeInterceptor implements NestInterceptor {
  /**
   * @param dto - The DTO class to serialize data into.
   * @param isPaginated - Whether the response is a paginated result.
   */
  constructor(
    private dto: ClassConstructor,
    private isPaginated: boolean = false,
  ) { }

  /**
   * Intercepts the response and transforms it using the provided DTO.
   * @param _ - Execution context (not used).
   * @param handler - Call handler for the request.
   * @returns Observable with transformed data.
   */
  intercept(_: ExecutionContext, handler: CallHandler): Observable<unknown> {
    if (this.isPaginated) {
      return handler.handle().pipe(
        map((data: PageDto<unknown>) => {
          const transformedItems = data.items.map(item =>
            plainToInstance(this.dto, item, {
              excludeExtraneousValues: true,
              exposeUnsetFields: false,
            }),
          )

          return new PageSerializeDto(
            transformedItems,
            data.count,
            data.pages,
            data.currentPage,
          )
        }),
      )
    }

    return handler.handle().pipe(
      map((data: ClassConstructor) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          exposeUnsetFields: false,
        })
      }),
    )
  }
}
