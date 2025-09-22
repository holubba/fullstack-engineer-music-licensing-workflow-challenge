import { Tracks } from '@/src/app/database/entities'

export abstract class TracksRepository {
  abstract insert(
    track: Pick<Tracks, 'sceneId' | 'songId' | 'startTime' | 'endTime'>,
  ): Promise<Tracks | null>
  abstract findByIdOrFail(id: number): Promise<Tracks>
}
