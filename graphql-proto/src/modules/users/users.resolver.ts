import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { RegisterUserInput } from './dto/register-user.input';
import { UsersRepository } from './users.repository';
import { AuthenticatedUserResponse } from './dto/authenticated-user.response';
import { LoginInput } from './dto/login.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { CurrentUser } from './modules/auth/current-user.decorator';
import { IUserInJwt } from './user.interfaces';
import { GqlAuthGuard } from './modules/auth/gql-auth.quard';
import { AuthService } from './modules/auth/auth.service';
import { RolesGuard } from './modules/auth/roles/roles.guard';
import { Roles } from './modules/auth/roles/roles.decorator';
import { Role } from './modules/auth/roles/roles.enum';
import ParseMongoObjectIdPipe from '../../graphql/pipes/parse-mongo-object-id.pipe';

@Resolver((of) => UserEntity)
export class UsersResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
  ) {}
  @Mutation(() => AuthenticatedUserResponse)
  async registerUser(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<AuthenticatedUserResponse> {
    return this.usersService.register(registerUserInput);
  }

  @Mutation(() => AuthenticatedUserResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthenticatedUserResponse> {
    return this.usersService.login(loginInput);
  }

  @Query((returns) => UserEntity)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: IUserInJwt) {
    return this.usersRepository.findOneByUserId(user.userId);
  }

  @Query((returns) => Number)
  @UseGuards(GqlAuthGuard)
  async logout(@CurrentUser() user: IUserInJwt) {
    const userFound = await this.usersRepository.findOneByUserId(user.userId);
    return this.authService.closeSession(userFound);
  }

  @Query((returns) => UserEntity, { name: 'user' })
  async findOne(
    @Args('userId', { type: () => String }, ParseMongoObjectIdPipe)
    userId: string,
  ): Promise<UserEntity> {
    const user = await this.usersRepository.findOneByUserId(userId);
    if (!user) {
      throw new NotFoundException(`User userId=${userId} is not found`);
    }
    return user;
  }

  @Query(() => [UserEntity], { name: 'users' })
  async findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async removeUser(
    @Args('userId', { type: () => String }, ParseMongoObjectIdPipe)
    userId: string,
  ): Promise<boolean> {
    return this.usersRepository.remove(userId);
  }
}
