import { InjectModel } from '@nestjs/mongoose'
import { ConflictException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { Company } from 'src/companies/companies.interface'
import { CredentialsDto } from 'src/auth/auth.dto'
import { User } from 'src/users/users.interface'
import { Employee } from './employess.interface'
import Erros from 'src/enums/errors'
import { UserRole } from 'src/enums/user'

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Users') private user: Model<User>,
    @InjectModel('Employees') private employee: Model<Employee>,
    @InjectModel('Companies') private company: Model<Company>
  ) {}

  async create(credentialsDto: CredentialsDto, companyId: string): Promise<void> {
    let user: any = await this.user.findOne({ email: credentialsDto.email })
    if(user) throw new ConflictException(Erros.EMAIL_ALREADY_RESISTERED)

    user = new this.user({
      email: credentialsDto.email,
      password: credentialsDto.password,
      role: UserRole.EMPLOYEE,
      confirmationMail: true
    })
    await user.save()

    const company = await this.company.findOne({
      user: companyId
    })

    const employee = new this.employee({
      user: user._id,
      company: company._id
    })
    await employee.save()
  }

  async list(companyId: string) {
    return await this.employee.find({
      company: companyId
    }).populate('user', 'email').select('hours')
  }

  async detail(employeeId: string) {
    return await this.employee
      .findById(employeeId)
      .populate('user', 'email status')
      .select('hours')
  }

  async delete(employeeId: string) {
    const { user } = await this.employee.findById(employeeId).populate('user').select('user')
    
    user.status = false
    await user.save()
  }
}
