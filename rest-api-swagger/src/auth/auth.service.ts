import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { LoginBody } from '../users/dto/login.body'
import { LoginResponse } from '../users/dto/login.response'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login({ username, password }: LoginBody): Promise<LoginResponse> {
    if (!username || !password) throw new BadRequestException()

    let user = null

    user = await this.validateUser(username, password)

    if (!user) {
      throw new BadRequestException()
    }

    const payload = { username: user.username, sub: user.userId }

    return Promise.resolve({
      access_token: this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') }),
    })
  }
}
