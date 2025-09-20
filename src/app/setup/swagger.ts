import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const SWAGGER_NAME = 'Movies Track License App'
const SWAGGER_ROOT = 'docs'

export const setupSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService)
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_NAME)
    .setVersion(configService.get<string>('API_VERSION', 'Missing'))
    .build()
  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: false,
  })
  SwaggerModule.setup(SWAGGER_ROOT, app, document, {
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      operationsSorter: 'method',
      persistAuthorization: true,
    },
  })
}
