import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './auth.constants';
import { IUser, IUserInJwt } from '../../user.interfaces';
import { UsersRepository } from '../../users.repository';
import { TokensRepository } from './tokens.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly tokensCache: TokensRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<IUserInJwt> {
    const { sub: id } = payload;
    const user: IUser = await this.usersRepository.findOneByUserId(id);
    if (!user) {
      return null;
    }
    if (!(await this.tokensCache.getToken(user.email))) {
      throw new UnauthorizedException('Session is not found');
    }
    return { userId: user.userId, username: user.username };
  }
}
