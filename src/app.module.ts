import { MongooseModule } from '@nestjs/mongoose'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { CompaniesModule } from './companies/companies.module'
import { EmployeesModule } from './employees/employees.module'
import { UsersModule } from './users/users.module'
import { MailModule } from './mail/mail.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      }
    }),
    UsersModule,
    CompaniesModule,
    MailModule,
    AuthModule,
    EmployeesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
