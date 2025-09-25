import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class CreateSongResponseDto {
  @ApiProperty({ description: 'Unique identifier for the song' })
  @Expose()
  id: string

  @ApiProperty({ description: 'Name of the song' })
  @Expose()
  name: string

  @ApiProperty({ description: 'Artist of the song' })
  @Expose()
  artistName: string

  @ApiProperty({ description: 'Artist of the song' })
  @Expose()
  duration: string

  @ApiProperty({ description: 'Date when the song was created' })
  @Expose()
  createdAt: Date
}
