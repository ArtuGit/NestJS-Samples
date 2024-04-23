import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema.';
import { AuthModule } from './modules/auth/auth.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService, UsersRepository],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
