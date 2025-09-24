import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { applyDecorators, Type } from '@nestjs/common'

import {
  BasePaginatedResponseDto,
  errorBadRequestSchema,
  BaseResponseDto,
  errorSchema,
} from './base-response.dto'

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(BasePaginatedResponseDto, dataDto),
    ApiOkResponse({
      description: 'Successful Operation',
      schema: {
        allOf: [
          { $ref: getSchemaPath(BasePaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )

export const CustomApiOkResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(BaseResponseDto, dataDto),
    ApiOkResponse({
      description: 'Successful Operation',
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  )

export const CustomApiCreatedResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(BaseResponseDto, dataDto),
    ApiCreatedResponse({
      description: 'Resource created successfully',
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDto),
              },
            },
          },
        ],
      },
    }),
  )

export enum HttpMethods {
  get = 'get',
  post = 'post',
  put = 'put',
  patch = 'patch',
  delete = 'delete',
}

export enum ResponseCodes {
  Success = 200,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  ServerError = 500,
}

export const buildResponseCodeExamples = (
  responseCodes: ResponseCodes[],
): Array<ClassDecorator | MethodDecorator | PropertyDecorator> => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = []

  for (const response of responseCodes) {
    switch (response) {
      case ResponseCodes.BadRequest: {
        decorators.push(
          ApiBadRequestResponse({
            description: 'Bad request error',
            example: {
              error: {
                message: 'Bad Request Exception',
                status: 400,
                reasons: ['Movie already exists'],
              },
            },
            schema: errorBadRequestSchema,
          }),
        )
        break
      }
      case ResponseCodes.Unauthorized: {
        decorators.push(
          ApiUnauthorizedResponse({
            description: 'Unauthorized user',
            example: {
              error: {
                message: 'Unauthorized',
                status: 401,
              },
            },
            schema: errorSchema,
          }),
        )
        break
      }
      case ResponseCodes.Forbidden: {
        decorators.push(
          ApiForbiddenResponse({
            description: 'Forbidden resource',
            example: {
              error: {
                message: 'Forbidden resource',
                status: 403,
              },
            },
            schema: errorSchema,
          }),
        )
        break
      }
      case ResponseCodes.NotFound: {
        decorators.push(
          ApiNotFoundResponse({
            description: 'Resource not found',
            example: {
              error: {
                message:
                  'The movie with the specified ID was not found in the database',
                status: 404,
              },
            },
            schema: errorSchema,
          }),
        )
        break
      }
      case ResponseCodes.ServerError: {
        decorators.push(
          ApiNotFoundResponse({
            description: 'Internal server error',
            example: {
              error: {
                message: 'Internal Server Error',
                status: 500,
              },
            },
            schema: errorSchema,
          }),
        )
        break
      }
      default: {
        throw new Error('Swagger Docs build error')
      }
    }
  }
  return decorators
}
