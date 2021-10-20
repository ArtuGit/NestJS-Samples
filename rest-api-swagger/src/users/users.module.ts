import { forwardRef, Module } from "@nestjs/common";

import { UsersService } from './users.service'
import { UsersController } from './users.controller';
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
