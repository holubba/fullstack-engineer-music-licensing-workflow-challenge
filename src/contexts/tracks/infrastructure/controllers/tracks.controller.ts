import { Controller, Body } from '@nestjs/common'

import {
  HttpMethods,
  SwaggerDocs,
} from '@/src/contexts/shared/swagger/api-responses-docs'
import { Endpoint } from '@/src/app/http-api/decorators/configure-endpoint.decorator'
import { CONTROLLERS } from '@/src/app/constants/controllers'
import { TAGS } from '@/src/app/constants/tags'

import { CreateTrackResponseDto } from './dtos/responses/create-track.response.dto'
import { CreateTrackRequestDto } from './dtos/requests/create-track.request.dto'
import { TracksService } from '../../application/tracks-service'
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
