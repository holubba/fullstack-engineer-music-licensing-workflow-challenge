import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiHeaderOptions,
  ApiParamOptions,
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
  ApiOperation,
  ApiHeaders,
  ApiParam,
  ApiTags,
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

const buildResponseCodeExamples = (
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

export const SwaggerDocs = <DataDto extends Type<unknown>>(schema: {
  dataDto: DataDto | null
  isPaginated: boolean
  httpMethod: HttpMethods
  errorResponseCodes: ResponseCodes[]
  tags: string
  description: string
  summary: string
  headers?: ApiHeaderOptions[]
  params?: ApiParamOptions
}) => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = []

  decorators.push(
    ApiOperation({
      description: schema.description,
      summary: schema.summary,
    }),
    ApiTags(schema.tags),
  )

  if (schema.params) {
    decorators.push(ApiParam(schema.params))
  }

  if (schema.headers) {
    decorators.push(ApiHeaders(schema.headers))
  }

  if (schema.httpMethod === HttpMethods.delete || !schema.dataDto) {
    decorators.push(
      ApiNoContentResponse({ description: 'No content success response' }),
    )
  } else if (schema.httpMethod === HttpMethods.get) {
    const responseDecorator = schema.isPaginated
      ? ApiOkResponsePaginated(schema.dataDto)
      : CustomApiOkResponse(schema.dataDto)

    decorators.push(responseDecorator)
  } else {
    decorators.push(CustomApiCreatedResponse(schema.dataDto))
  }

  const errorCodeResponses = buildResponseCodeExamples(
    schema.errorResponseCodes,
  )

  return applyDecorators(...decorators, ...errorCodeResponses)
}
