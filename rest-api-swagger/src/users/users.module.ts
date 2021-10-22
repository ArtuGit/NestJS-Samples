import { forwardRef, Module } from '@nestjs/common'

import { AuthModule } from '../auth/auth.module'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
