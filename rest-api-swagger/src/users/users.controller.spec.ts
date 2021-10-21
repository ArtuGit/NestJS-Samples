import { Test, TestingModule } from '@nestjs/testing'
import { forwardRef } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'

import { UsersController } from './users.controller'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [forwardRef(() => AuthModule)],
      controllers: [UsersController],
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
