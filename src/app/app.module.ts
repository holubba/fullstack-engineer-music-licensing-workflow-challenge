import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

import { LicensesControllerModule } from '../contexts/licenses/infrastructure/controllers/licenses.module'
import { MoviesControllerModule } from '../contexts/movies/infrastructure/controllers/movies.module'
import { TracksControllerModule } from '../contexts/tracks/infrastructure/controllers/tracks.module'
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
    TracksControllerModule,
    LicensesControllerModule,
  ],
})
export class AppModule { }
