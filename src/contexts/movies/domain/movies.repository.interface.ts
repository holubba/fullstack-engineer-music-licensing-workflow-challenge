import { Movies } from "./movies.entity";

export abstract class MoviesRepository {
  abstract findById(id: number): Promise<Movies | null>
  abstract findAll(): Promise<Movies[]>
}
