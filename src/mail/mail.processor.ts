import { MailerService } from "@nestjs-modules/mailer"
import { Process, Processor } from "@nestjs/bull"
import { Job } from 'bull'

@Processor('mail')
export class MailProcessor {
  constructor(private mailService: MailerService) {}

  @Process('confimation')
  async emailConfirmation(job: Job<{ email: string, token: string }>) {
    try {
      await this.mailService.sendMail({
        to: job.data.email,
        from: process.env.MAIL_TO,
        subject: 'Email de confirmação',
        template: 'email-confirmation',
        context: {
          token: job.data.token
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  @Process('recoverPassword')
  async mailRecoverPassword(job: Job<{ email: string, token: string }>) {
    try {
      await this.mailService.sendMail({
        to: job.data.email,
        from: process.env.MAIL_TO,
        subject: 'Email de recuperação de senha',
        template: 'recover-password',
        context: {
          token: job.data.token
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}