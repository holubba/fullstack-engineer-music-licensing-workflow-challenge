/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  initializeTransactionalContext,
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional'
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { DataSourceOptions, DataSource } from 'typeorm'
import { Module } from '@nestjs/common'

import { MINIMAL_TEST_DATA_SOURCE, TEST_DATA_SOURCE } from './data-source'

export async function mockDB() {
  const DATABASE_NAME = `db_test_${process.env.VITEST_WORKER_ID}`

  initializeTransactionalContext()
  const client = new DataSource(MINIMAL_TEST_DATA_SOURCE as DataSourceOptions)
  await client.initialize()
  const queryRunner = client.createQueryRunner()
  await queryRunner.query(`CREATE DATABASE ${DATABASE_NAME}; `)
  process.env.POSTGRES_DB = DATABASE_NAME
  await client.destroy()

  const clientWithDB = new DataSource(TEST_DATA_SOURCE as DataSourceOptions)
  await clientWithDB.initialize()

  return clientWithDB
}

export function testDto(dto: ClassConstructor<object>, payload: unknown) {
  return plainToInstance(dto, payload, {
    excludeExtraneousValues: true,
    exposeUnsetFields: false,
  })
}

export function testPaginatedDto(
  dto: ClassConstructor<object>,
  payload: Array<unknown>,
  expectedResult: unknown,
) {
  expect({
    items: payload.map(item =>
      plainToInstance(dto, item, {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      }),
    ),
  }).toEqual(expectedResult)
}

export async function dataSourceFactory(options: any): Promise<DataSource> {
  return (
    getDataSourceByName('default') ||
    addTransactionalDataSource(new DataSource(options))
  )
}

const getTypeOrmModuleOptions = (): TypeOrmModuleOptions => {
  const dataSource = TEST_DATA_SOURCE
  return dataSource as TypeOrmModuleOptions
}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: getTypeOrmModuleOptions,
      dataSourceFactory,
    }),
  ],
})
export class TestTypeOrmConfigModule { }
