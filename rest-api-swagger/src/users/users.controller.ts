import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'

import { AuthService } from '../auth/auth.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { LoginBody } from './dto/login.body'

@Controller('user')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: LoginBody) {
    return this.authService.login({ username, password })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
