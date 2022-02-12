import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { UsersController } from './users.controller'
import { MailModule } from 'src/mail/mail.module'
import { UsersService } from './users.service'
import { UserSchema } from './users.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema }
    ]),
    MailModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
