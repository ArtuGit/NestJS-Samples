import { RedisModule } from '@liaoliaots/nestjs-redis';
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from '../../users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TokensService } from './tokens.service';
import { TokensRepository } from './tokens.repository';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [AuthService, TokensService, TokensRepository, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
