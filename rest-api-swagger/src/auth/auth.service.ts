import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare, compareSync, hashSync } from 'bcrypt'

import { UsersService } from '../users/users.service'
import { LoginBody } from '../users/dto/login.body'
import { LoginResponse } from '../users/dto/login.response'
import { IUserPublic } from '../users/interfaces/user.interface'
import { User } from '../users/entities/user'
import { AuthenticatedResponse } from '../users/dto/authenticated.response'

import { TokensService } from './tokens.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokensService: TokensService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByUserName(username)
    if (user && compareSync(pass, hashSync(user.password, 10))) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
