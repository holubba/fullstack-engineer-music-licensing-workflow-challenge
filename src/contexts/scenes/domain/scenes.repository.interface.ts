import { Scenes } from './scenes.entity'

export abstract class ScenesRepository {
  abstract findById(id: number): Promise<Scenes | null>
}
