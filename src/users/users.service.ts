import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { v4 as uuid4 } from 'uuid'
import * as bcrypt from 'bcryptjs'
import { Model } from 'mongoose'

import { ChancePasswirdRecoverDto } from './users.dto'
import { MailService } from 'src/mail/mail.service'
import { User } from './users.interface'
import Erros from 'src/enums/errors'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private user: Model<User>,
    private mailService: MailService
  ) {}

  async validateEmail(token: string): Promise<void> {
    const user = await this.user.findOne({
      confirmationToken: token
    })
    
    if(!user) throw new NotFoundException(Erros.USER_NOT_FOUND)

    user.confirmationMail = true
    await user.save()
  }

  async requestRecoverPassword(email: string): Promise<void> {
    const user = await this.user.findOne({
      email: email
    })

    if(!user) throw new NotFoundException(Erros.USER_NOT_FOUND)

    user.recoverToken = uuid4()
    await user.save()

    if (process.env.NODE_ENV != 'test')
      await this.mailService.mailRecoverPassword(user.email, user.recoverToken)
  }

  async passwordRecover(recoverPasswordDto: ChancePasswirdRecoverDto): Promise<void> {
    const user = await this.user.findOne({
      recoverToken: recoverPasswordDto.token
    })

    if(!user) throw new NotFoundException(Erros.USER_NOT_FOUND)

    if(await bcrypt.compare(recoverPasswordDto.password, user.password)) throw new ConflictException(Erros.PASSWORD_CONFLICT)

    user.password = recoverPasswordDto.password
    user.recoverToken = null
    await user.save()
  }
}
