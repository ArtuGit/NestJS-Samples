import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { UsersModule } from '../users/users.module'

import { AuthenticationController } from './auth.controller'
import { RefreshTokensRepository } from './refresh-tokens.repository'
import { TokensService } from './tokens.service'
import { JwtStrategy } from './strategies/jwt.strategy'

describe('AuthController', () => {
  let controller: AuthenticationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, UsersModule, JwtModule],
      controllers: [AuthenticationController],
      providers: [RefreshTokensRepository, TokensService, JwtStrategy],
    }).compile()

    controller = module.get<AuthenticationController>(AuthenticationController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
