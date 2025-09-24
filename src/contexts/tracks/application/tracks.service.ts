import { Transactional } from 'typeorm-transactional'
import { Injectable, Inject } from '@nestjs/common'

import { APPLICATION_ERRORS } from '@/src/app/common/response-normalizer/errors'
import { LicenseStatus } from '@/src/app/database/entities/types/types'

import { CreateTrackRequestDto } from '../infrastructure/controllers/dtos/requests/create-track.request.dto'
import {
  validateTrackWithinSong,
  secondsToHHMMSS,
  hhmmssToSeconds,
} from '../../shared/utils/utils'
import { LicensesRepository } from '../../licenses/domain/licenses.repository'
import { ScenesRepository } from '../../scenes/domain/scenes.repository'
import { SongsRepository } from '../../songs/domain/songs.repository'
import { TracksRepository } from '../domain/tracks.repository'
import { throwError } from '../../shared/utils/throw-error'
import { Tracks } from '../domain/tracks.entity'

@Injectable()
export class TracksService {
  constructor(
    @Inject(TracksRepository)
    private readonly tracksRepository: TracksRepository,
    @Inject(SongsRepository)
    private readonly songsRepository: SongsRepository,
    @Inject(ScenesRepository)
    private readonly scenesRepository: ScenesRepository,
    @Inject(LicensesRepository)
    private readonly licensesRepository: LicensesRepository,
  ) { }

  @Transactional()
  async create(input: CreateTrackRequestDto): Promise<Tracks> {
    const song = await this.songsRepository.findById(input.songId)
    if (!song) {
      throwError(APPLICATION_ERRORS.SONGS.NOT_FOUND_ERROR)
    }

    const scene = await this.scenesRepository.findById(input.sceneId)
    if (!scene) {
      throwError(APPLICATION_ERRORS.SCENES.NOT_FOUND_ERROR)
    }

    validateTrackWithinSong(
      input.startTime,
      input.endTime,
      secondsToHHMMSS(song.duration),
    )

    const newTrack = await this.tracksRepository.insert({
      ...input,
      startTime: hhmmssToSeconds(input.startTime),
      endTime: hhmmssToSeconds(input.endTime),
    })

    await this.licensesRepository.create({
      trackId: newTrack.id,
      status: LicenseStatus.PENDING,
      rightsHolder: input.rightsHolder,
      notes: input.notes,
    })

    return await this.tracksRepository.findByIdOrFail(newTrack.id)
  }
}
