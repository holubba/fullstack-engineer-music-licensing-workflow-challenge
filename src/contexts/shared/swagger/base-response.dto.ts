import { ApiProperty } from '@nestjs/swagger'

export class BaseResponseDto<T> {
  data: T
}

export class BasePaginatedResponseDto<T> {
  items: T[]
  @ApiProperty({ example: 1 })
  count: number
  @ApiProperty({ example: 1 })
  currentPage: number
  @ApiProperty({ example: 1 })
  pages: number
}

export const errorBadRequestSchema = {
  properties: {
    error: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        status: { type: 'integer' },
        reasons: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  },
}

export const errorSchema = {
  properties: {
    error: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        status: { type: 'integer' },
      },
    },
  },
}
