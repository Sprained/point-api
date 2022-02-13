import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectModel } from "@nestjs/mongoose"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { Model } from "mongoose"

import { User } from "src/users/users.interface"
import Erros from 'src/enums/errors'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Users') private user: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    })
  }

  async validate(payload: { id: string }) {
    const { id } = payload

    const user = await this.user.findById(id).select({
      email: 1, status: 1, role: 1
    })

    if(!user) throw new UnauthorizedException(Erros.USER_NOT_FOUND)

    return user
  }
}