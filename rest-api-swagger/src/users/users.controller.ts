import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from '../auth/auth.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User as UserLoggedIn } from '../auth/decorators/user.decorator'

import { LoginBody } from './dto/login.body'
import { LoginResponse } from './dto/login.response'
import { User } from './entities/user'

@ApiTags('Users')
@Controller({
  path: 'user',
  version: '1',
})
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  // @Post('/register')
  // public async register (@Body() body: RegisterRequest) {
  //   const user = await this.users.createUserFromRequest(body)
  //
  //   const token = await this.tokens.generateAccessToken(user)
  //   const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30)
  //
  //   const payload = this.buildResponsePayload(user, token, refresh)
  //
  //   return {
  //     status: 'success',
  //     data: payload,
  //   }
  // }

  @ApiOkResponse({ type: LoginResponse })
  @Post('login')
  async login(@Body() { username, password }: LoginBody): Promise<LoginResponse> {
    return this.authService.login({ username, password })
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get('profile')
  getProfile(@UserLoggedIn() user: any): User {
    return user
  }
}
