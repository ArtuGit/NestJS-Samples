import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

import { IUserPublic } from '../../user.interfaces';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(user: IUserPublic): Promise<string> {
    const opts: SignOptions = {
      expiresIn: 60 * 60 * 1000, //minutes to milliseconds,
      subject: String(user.userId),
    };

    return this.jwtService.signAsync({}, opts);
  }
}
