type ApplicationErrorPayload = {
  message: string
  statusCode: number
}

/**
 * Throws an application-specific error.
 * @param {ApplicationErrorPayload} errorPayload - The payload containing message and status code.
 * @throws {ApplicationError} Always throws an ApplicationError with the given payload.
 */
export function throwError(errorPayload: ApplicationErrorPayload): never {
  throw new ApplicationError(errorPayload)
}

/**
 * Represents a structured application error.
 * Extends the native Error class to include an HTTP status code.
 */
export class ApplicationError extends Error {
  public statusCode: number

  /**
   * @param {ApplicationErrorPayload} payload - The payload containing the error message and status code.
   */
  constructor({ message, statusCode }: ApplicationErrorPayload) {
    super()
    this.message = message
    this.statusCode = statusCode
  }

  /**
   * Returns the HTTP status code associated with the error.
   * @returns {number}
   */
  getStatus(): number {
    return this.statusCode
  }

  /**
   * Returns the error message.
   * @returns {string}
   */
  getReasons(): string {
    return this.message
  }
}
