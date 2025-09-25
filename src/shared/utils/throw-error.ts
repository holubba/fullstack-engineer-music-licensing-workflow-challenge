type ApplicationErrorPayload = {
  message: string
  statusCode: number
}

/**
 * Throws an application-specific error with an optional overridden message.
 *
 * @param {ApplicationErrorPayload} errorPayload - The payload containing details like message, status code, and other metadata.
 * @param {string} [overrideMessage] - Optional message to override the one in `errorPayload`.
 * @throws {ApplicationError} Always throws an `ApplicationError` constructed from the payload and optional override message.
 */
export function throwError(
  errorPayload: ApplicationErrorPayload,
  overrideMessage?: string,
): never {
  throw new ApplicationError({
    ...errorPayload,
    message: overrideMessage ?? errorPayload.message,
  })
}

/**
 * Represents a structured application error.
 * Extends the native Error class to include an HTTP status code.
 */
export class ApplicationError extends Error {
  private statusCode: number

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
