import { Songs } from '@/src/app/database/entities'

export abstract class SongsRepository {
  abstract findById(id: number): Promise<Songs | null>
}
