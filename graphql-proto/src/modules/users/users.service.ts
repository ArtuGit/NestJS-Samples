import * as bcrypt from 'bcrypt';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { RegisterUserInput } from './dto/register-user.input';
import { UserEntity } from './user.entity';
import { AuthService } from './modules/auth/auth.service';
import { UsersRepository } from './users.repository';
import { AuthenticatedUserResponse } from './dto/authenticated-user.response';
import { LoginInput } from './dto/login.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  async register(
    registerUserInput: RegisterUserInput,
  ): Promise<AuthenticatedUserResponse> {
    registerUserInput.password = await bcrypt.hash(
      registerUserInput.password,
      10,
    );

    const users = await this.usersRepository.findByAnyProp([
      { username: registerUserInput.username },
      { email: registerUserInput.email },
    ]);
    if (users.length > 0) {
      throw new UnprocessableEntityException(
        `Username (${registerUserInput.username}) or email (${registerUserInput.email}) is already registered`,
      );
    }
    const user = await this.usersRepository.create({ ...registerUserInput });
    return this.authService.openSession(user);
  }

  async login(loginInput: LoginInput): Promise<AuthenticatedUserResponse> {
    const user = await this.usersRepository.findOneByEmail(loginInput.email);
    if (!this.authService.validateUser(user, loginInput.password)) {
      throw new UnprocessableEntityException('Invalid credentials');
    }
    return this.authService.openSession(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.usersRepository.findAll();
  }
}
