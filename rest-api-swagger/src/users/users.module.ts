import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from '../auth/auth.module'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  imports: [forwardRef(() => AuthModule), ConfigModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
