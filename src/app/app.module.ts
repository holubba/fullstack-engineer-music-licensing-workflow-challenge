import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { MoviesControllerModule } from '../contexts/movies/infrastructure/http-api/v1/movies.module'
import { EnvironmentConfigModule } from './environment-config/environment-config.module'
import { TypeOrmConfigModule } from './database/typeorm.module'
import { HttpApiModule } from './http-api/http-api.module'

@Module({
  imports: [
    HttpApiModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    MoviesControllerModule,
  ],
})
export class AppModule { }
