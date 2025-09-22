type ApplicationErrorPayload = {
  message: string
  statusCode: number
}

export function throwError(errorPayload: ApplicationErrorPayload): never {
  throw new ApplicationError(errorPayload)
}

export class ApplicationError extends Error {
  public statusCode: number
  constructor({ message, statusCode }: ApplicationErrorPayload) {
    super()
    this.message = message
    this.statusCode = statusCode
  }

  getStatus() {
    return this.statusCode
  }

  getReasons() {
    return this.message
  }
}
