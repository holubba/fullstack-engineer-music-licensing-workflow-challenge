import { Tracks } from "./tracks.entity";

export abstract class TracksRepository {
  abstract insert(
    track: Pick<Tracks, 'sceneId' | 'songId' | 'startTime' | 'endTime'>,
  ): Promise<Tracks>
  abstract findByIdOrFail(id: number): Promise<Tracks>
}
