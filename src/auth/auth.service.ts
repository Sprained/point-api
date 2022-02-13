import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { Model } from 'mongoose'

import { User } from 'src/users/users.interface'
import { RefreshToken } from './auth.interface'
import { CredentialsDto } from './auth.dto'
import Erros from 'src/enums/errors'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private user: Model<User>,
    @InjectModel('RefreshToken') private refreshToken: Model<RefreshToken>,
    private jwtService: JwtService
  ) {}

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User | void> {
    const { email, password } = credentialsDto
    const user = await this.user.findOne({
      email, status: true
    }).select({_id: 1, password: 1})

    if(!user || !(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException(Erros.CREDENTIALS_ERROR)
    
    return user
  }

  async createRefreshToken(user_id: string, ttl: number): Promise<string> {
    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)

    const token = new this.refreshToken({
      user: user_id,
      expires: expiration
    })
    await token.save()

    const refreshToken = this.jwtService.signAsync({}, {
      expiresIn: ttl,
      subject: String(user_id),
      jwtid: String(token._id)
    })

    return refreshToken
  }
}
