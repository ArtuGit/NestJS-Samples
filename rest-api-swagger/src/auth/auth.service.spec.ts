import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Test, TestingModule } from '@nestjs/testing'
import { forwardRef } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersModule } from '../users/users.module'

import { AuthService } from './auth.service'
import { JwtStrategy, JwtStrategyTest } from './strategies/jwt.strategy'

describe('AuthService', () => {
  let service: AuthService

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
          }),
          inject: [ConfigService],
        }),
        ConfigModule,
      ],
      providers: [AuthService, JwtStrategy],
    })
      .overrideProvider(JwtStrategy)
      .useClass(JwtStrategyTest)
      .compile()

    service = moduleRef.get<AuthService>(AuthService)
  })

  describe('validateUser', () => {
    it('should return a user object when credentials are valid', async () => {
      const res = await service.validateUser('maria', 'guess')
      expect(res.id).toEqual('3')
    })

    it('should return null when credentials are invalid', async () => {
      const res = await service.validateUser('xxx', 'xxx')
      expect(res).toBeNull()
    })
  })

  // describe('validateLogin', () => {
  //   it('should return JWT object when credentials are valid', async () => {
  //     const res = await service.login({ username: 'john', password: 'changeme' })
  //     expect(res.access_token).toBeDefined()
  //   })
  // })
})
