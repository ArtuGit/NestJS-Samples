import { forwardRef, Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
