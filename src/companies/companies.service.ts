import { InjectModel } from '@nestjs/mongoose'
import { ConflictException, Injectable } from '@nestjs/common'
import { v4 as uuid4 } from 'uuid'
import { Model } from 'mongoose'

import { MailService } from '../mail/mail.service'
import { CreateCompanyDto } from './companies.dto'
import { User } from '../users/users.interface'
import { Company } from './companies.interface'
import { UserRole } from 'src/enums/user'
import Erros from 'src/enums/errors'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel('Companies') private company: Model<Company>, 
    @InjectModel('Users') private user: Model<User>,
    private mailService: MailService
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<void> {
    let user: any = await this.user.findOne({ email: createCompanyDto.email })
    if(user) throw new ConflictException(Erros.EMAIL_ALREADY_RESISTERED)
    
    user = await this.user.findOne({ cnpj: createCompanyDto.cnpj })
    if(user) throw new ConflictException(Erros.CNPJ_ALREADY_RESISTERED)

    user = new this.user({
      email: createCompanyDto.email,
      password: createCompanyDto.password,
      confirmationToken: uuid4(),
      role: UserRole.COMPANY
    })

    await user.save()
    
    delete createCompanyDto.email
    delete createCompanyDto.password

    createCompanyDto.user = user._id

    const company = new this.company(createCompanyDto)
    await company.save()

    if (process.env.NODE_ENV != 'test')
      await this.mailService.emailConfirmation(user.email, user.confirmationToken)
  }

  async getCompanyByUserId(userId: string): Promise<Company> {
    return await this.company.findOne({
      user: userId
    })
  }
}
