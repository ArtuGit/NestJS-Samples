import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersModule } from '../users/users.module'

import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { TokensService } from './tokens.service'
import { RefreshTokensRepository } from './refresh-tokens.repository'

@Module({
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
  providers: [RefreshTokensRepository, TokensService, AuthService, JwtStrategy],
  exports: [TokensService, AuthService],
})
export class AuthModule {}
