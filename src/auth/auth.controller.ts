import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtService } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { CredentialsDto } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() credentialsDto: CredentialsDto) {
    const user: any = await this.authService.checkCredentials(credentialsDto)

    const token = this.jwtService.sign({ id: user._id })

    const refreshToken = await this.authService.createRefreshToken(user._id, parseInt(process.env.EXPRIES_IN_REFRESH))

    return {
      token, refreshToken
    }
  }

  @Get('me')
  @UseGuards(AuthGuard())
  getMe(@Req() req) {
    return req.user
  }
}
