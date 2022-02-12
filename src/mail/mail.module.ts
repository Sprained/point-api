import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailerModule } from '@nestjs-modules/mailer'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { MailProcessor } from './mail.processor'
import { MailService } from './mail.service'

@Module({
  imports: [
    MailerModule.forRoot({
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      }
    }),
    BullModule.registerQueue({
      name: 'mail'
    })
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService]
})
export class MailModule {}
