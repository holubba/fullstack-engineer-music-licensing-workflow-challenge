import { Controller, Body } from '@nestjs/common'

import { SwaggerDocs } from '@/src/shared/decorators/swagger.decorator'
import { Endpoint } from '@/src/shared/decorators/endpoint.decorator'
import { HttpMethods } from '@/src/shared/swagger/api-responses-docs'
import { CONTROLLERS } from '@/src/app/constants/api.constants'
import { TAGS } from '@/src/app/constants/docs.contants'

import { CreateTrackResponseDto } from './dtos/responses/create-track.response.dto'
import { CreateTrackRequestDto } from './dtos/requests/create-track.request.dto'
import { TracksService } from '../../application/tracks.service'
import { Tracks } from '../../domain/tracks.entity'

@Controller(CONTROLLERS.TRACKS)
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @SwaggerDocs({
    dataDto: CreateTrackResponseDto,
    isPaginated: false,
    httpMethod: HttpMethods.post,
    errorResponseCodes: [400, 401, 403, 404],
    tags: TAGS.TRACKS,
    description: 'Creates a new track and associates it to a song \n\n',
    summary: 'Creates a track and associates it to a song',
  })
  @Endpoint({
    responseDto: CreateTrackResponseDto,
    operation: HttpMethods.post,
  })
  async createTrackWithLicense(
    @Body() newTrack: CreateTrackRequestDto,
  ): Promise<Tracks> {
    return await this.tracksService.create(newTrack)
  }
}
