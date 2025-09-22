import {
  InternalServerErrorException,
  BadRequestException,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  Catch,
} from '@nestjs/common'
import { FastifyReply } from 'fastify'

import { ApplicationError } from '@/src/contexts/shared/utils/throw-error'

@Catch()
export class ErrorResponseNormalizerFilter implements ExceptionFilter {
  async catch(rawException: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    const response = ctx.getResponse<FastifyReply>()

    const exception =
      rawException instanceof ApplicationError
        ? rawException
        : new InternalServerErrorException()

    const status = exception.getStatus()

    await response.status(status).send({ error: this.mapToError(exception) })
  }

  private mapToError(error: HttpException | ApplicationError) {
    return {
      message: error.message,
      status: error.getStatus(),
      reasons: this.getReasons(error),
    }
  }

  private getReasons(error: HttpException | ApplicationError) {
    if (!(error instanceof BadRequestException)) {
      return
    }

    return error.getResponse()
  }
}
