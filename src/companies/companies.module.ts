import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { UsersModule } from '../users/users.module'
import { UserSchema } from '../users/users.schema'
import { CompanySchema } from './companies.schema'
import { MailModule } from '../mail/mail.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Companies', schema: CompanySchema },
      { name: 'Users', schema: UserSchema }
    ]),
    MailModule,
    UsersModule
  ],
  providers: [CompaniesService],
  controllers: [CompaniesController],
  exports: [CompaniesService]
})
export class CompaniesModule {}
