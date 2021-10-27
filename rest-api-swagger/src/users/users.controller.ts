import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from '../auth/auth.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User as UserLoggedIn } from '../auth/decorators/user.decorator'
import { TokensService } from '../auth/tokens.service'

import { LoginBody, LoginResponse, RegisterBody } from './dto'
import { User } from './entities/user'
import { UsersService } from './users.service'
import { AuthenticatedResponse } from './dto/authenticated.response'
import { IUserPublic } from './interfaces/user.interface'

@ApiTags('Users')
@Controller({
  path: 'user',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  private static buildResponsePayload(user: User, accessToken: string, refreshToken?: string): AuthenticatedResponse {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      },
    }
  }

  @ApiOkResponse({ type: AuthenticatedResponse })
  @Post('/register')
  public async register(@Body() body: RegisterBody): Promise<AuthenticatedResponse> {
    const user = await this.usersService.register(body.username, body.password)
    const token = await this.tokensService.generateAccessToken(user)
    const refresh = await this.tokensService.generateRefreshToken(user, 60 * 60 * 24 * 30)

    return UsersController.buildResponsePayload(user, token, refresh)
  }

  @ApiOkResponse({ type: LoginResponse })
  @Post('login')
  async login(@Body() { username, password }: LoginBody): Promise<AuthenticatedResponse> {
    if (!username || !password) throw new BadRequestException()

    let user: IUserPublic = null

    user = await this.authService.validateUser(username, password)

    if (!user) {
      throw new BadRequestException()
    }

    const token = await this.tokensService.generateAccessToken(user)
    const refresh = await this.tokensService.generateRefreshToken(user, 60 * 60 * 24 * 30)
    return UsersController.buildResponsePayload(user, token, refresh)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get('profile')
  getProfile(@UserLoggedIn() user: any): User {
    return user
  }
}
