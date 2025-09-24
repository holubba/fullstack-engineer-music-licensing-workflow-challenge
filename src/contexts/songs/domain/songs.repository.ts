import { Songs } from "./songs.entity";

export abstract class SongsRepository {
  abstract findById(id: number): Promise<Songs | null>
}
