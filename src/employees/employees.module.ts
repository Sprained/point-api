import { PassportModule } from '@nestjs/passport'
import { MongooseModule } from '@nestjs/mongoose'
import { Module } from '@nestjs/common'

import { CompaniesModule } from 'src/companies/companies.module'
import { CompanySchema } from 'src/companies/companies.schema'
import { EmployeesController } from './employees.controller'
import { EmployeesService } from './employees.service'
import { EmployeeSchema } from './employees.schema'
import { UserSchema } from 'src/users/users.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Employees', schema: EmployeeSchema },
      { name: 'Users', schema: UserSchema },
      { name: 'Companies', schema: CompanySchema }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CompaniesModule
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}
