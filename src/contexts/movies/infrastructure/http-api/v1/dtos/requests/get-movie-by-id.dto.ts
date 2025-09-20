import { IsNotEmpty, IsPositive, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class GetMovieByIdRequestDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @ApiProperty({ type: Number, example: 1 })
  id: number
}
