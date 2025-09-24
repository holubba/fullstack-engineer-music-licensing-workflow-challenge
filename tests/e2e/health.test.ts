import { TestingModule, Test } from '@nestjs/testing'

import { HealthController } from '@/src/contexts/health/health.controller'


describe('HealthController (unit)', () => {
  let controller: HealthController

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [HealthController],
    }).compile()

    controller = moduleFixture.get<HealthController>(HealthController)
  })

  it('should return an object with status and uptime', () => {
    const result = controller.run()
    expect(result).toEqual({
      status: 'ok',
      uptime: expect.any(Number) as number,
    })
  })
})
