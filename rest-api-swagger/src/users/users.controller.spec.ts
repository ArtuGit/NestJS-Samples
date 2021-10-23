import { Test, TestingModule } from '@nestjs/testing'
import { forwardRef } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'

import { UsersController } from './users.controller'
import { JwtStrategy, JwtStrategyTest } from '../auth/strategies/jwt.strategy'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule)],
      controllers: [UsersController],
    })
      .overrideProvider(JwtStrategy)
      .useClass(JwtStrategyTest)
      .compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
