import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'

import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './companies.dto'

@Controller('company')
export class CompaniesController {
  constructor(
    private companyService: CompaniesService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<void> {
    await this.companyService.create(createCompanyDto)
  }
}
