import { ApiProperty } from '@nestjs/swagger'

export class MoviesBase {
  @ApiProperty({
    description: 'Movie ID',
    example: 1,
  })
  id: number

  @ApiProperty({
    description: 'Movie name',
    example: 'El Camino',
  })
  name: string

  @ApiProperty({
    description: 'Movie creation datetime',
    example: new Date().toISOString(),
    required: false,
  })
  createdAt: Date

  @ApiProperty({
    description: 'Movie update datetime',
    example: new Date().toISOString(),
  })
  updatedAt: Date

  @ApiProperty({
    description: 'Movie delete datetime',
    example: new Date().toISOString(),
  })
  deletedAt: Date | null
}
