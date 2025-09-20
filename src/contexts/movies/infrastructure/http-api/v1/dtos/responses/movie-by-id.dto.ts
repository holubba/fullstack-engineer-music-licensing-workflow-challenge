import { Expose, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class MovieByIdResponseDto {
  @Expose()
  @Type(() => Number)
  @ApiProperty({
    example: 1,
  })
  id: number

  @Expose()
  @Type(() => String)
  @ApiProperty({
    example: 'Movie name',
  })
  name!: string
}
