import { Movies } from '@/src/app/database/entities'

export abstract class MoviesRepository {
  abstract findById(id: number): Promise<Movies>
}
