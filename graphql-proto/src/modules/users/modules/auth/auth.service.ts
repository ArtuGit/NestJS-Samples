import { compareSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IUser } from '../../user.interfaces';
import { UserEntity } from '../../user.entity';
import { AuthenticatedUserResponse } from '../../dto/authenticated-user.response';
import { TokensService } from './tokens.service';
import { TokensRepository } from './tokens.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly tokensRepository: TokensRepository,
  ) {}

  buildResponsePayload(
    user: UserEntity,
    token: string,
  ): AuthenticatedUserResponse {
    return {
      user: user,
      auth: {
        type: 'Bearer token',
        token: token,
      },
    };
  }

  validateUser(user: IUser, pass: string): boolean {
    return user && compareSync(pass, user.password);
  }

  async openSession(user: IUser): Promise<AuthenticatedUserResponse> {
    const token = await this.tokensService.generateAccessToken(user);
    await this.tokensRepository.addToken(user.email, token);
    return this.buildResponsePayload(user, token);
  }

  async closeSession(user: IUser): Promise<number> {
    return this.tokensRepository.removeToken(user.email);
  }
}
