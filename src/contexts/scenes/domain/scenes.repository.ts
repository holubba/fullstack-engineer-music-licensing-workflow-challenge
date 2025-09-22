import { Scenes } from '@/src/app/database/entities'

export abstract class ScenesRepository {
  abstract findById(id: number): Promise<Scenes | null>
}
