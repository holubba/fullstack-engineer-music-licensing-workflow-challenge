export class MovieNotFoundError extends Error {
  constructor(msg?: string) {
    super('MovieNotFoundError')
    this.message = msg || 'MovieNotFoundError'
  }
}
