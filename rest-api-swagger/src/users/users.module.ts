import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '../auth/auth.module'

import { UsersService } from './users.service'

@Module({
  imports: [forwardRef(() => AuthModule), ConfigModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
