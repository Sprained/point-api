import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mail') private mailQueue: Queue,
  ) {}

  async emailConfirmation(email: string, token: string) {
    await this.mailQueue.add('confimation', {
      email, token
    })
  }

  async mailRecoverPassword(email: string, token: string) {
    await this.mailQueue.add('recoverPassword', {
      email, token
    })
  }
}
