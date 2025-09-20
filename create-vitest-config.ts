import { loadEnv } from 'vite'

import { r } from './tests/utils/alias'

export const createVitestTestConfig = () => {
  return {
    name: 'e2e',
    dir: 'tests/unit',
    hookTimeout: 60_000,
    pool: 'forks',
    minWorkers: 1,
    maxWorkers: 3,
    deps: {
      interopDefault: false,
    },
    globalSetup: r('./tests/utils/vitest-setup.ts'),
    include: ['**/*.test.ts'],
    globals: true,
    env: loadEnv('test', process.cwd(), ''),
  }
}
