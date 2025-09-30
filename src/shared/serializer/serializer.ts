import { ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { PageSerializeDto, PageDto } from '../pagination/page-dto'

/**
 * Constructor type for a class.
 */
export interface ClassConstructor<T = unknown> {
  new (...args: unknown[]): T
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
    private dto: ClassConstructor<unknown>,
    private isPaginated: boolean = false,
  ) {}

  /**
   * Intercepts the response and transforms it using the provided DTO.
   * @param _ - Execution context (not used).
   * @param handler - Call handler for the request.
   * @returns Observable with transformed data.
   */
  intercept<T>(
    _: ExecutionContext,
    handler: CallHandler,
  ): Observable<T | PageSerializeDto<T>> {
    if (this.isPaginated) {
      return handler.handle().pipe(
        map((data: PageDto<unknown>) => {
          const transformedItems = data.items.map(item => {
            return this.transformData<T>(item)
          })

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
      map((data: unknown) => {
        return this.transformData<T>(data)
      }),
    )
  }

  private transformData<T>(data: unknown): T {
    return plainToInstance<T, unknown>(this.dto as ClassConstructor<T>, data, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    })
  }
}
