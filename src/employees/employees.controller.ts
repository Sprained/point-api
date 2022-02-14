import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CompaniesService } from 'src/companies/companies.service'
import { Role } from 'src/auth/decorators/role.decorator'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { EmployeesService } from './employees.service'
import { CredentialsDto } from 'src/auth/auth.dto'
import { UserRole } from 'src/enums/user'

@Controller('employee')
export class EmployeesController {
  constructor (
    private employeeService: EmployeesService,
    private companyService: CompaniesService
  ) {}

  @Post()
  @Role(UserRole.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() credentialsDto: CredentialsDto, @Req() req) {
    await this.employeeService.create(credentialsDto, req.user.id)
  }

  @Get()
  @Role(UserRole.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  async list(@Req() req) {
    const company = await this.companyService.getCompanyByUserId(req.user.id)

    const employees = await this.employeeService.list(company._id)

    return employees
  }

  @Get(':employeeId')
  @Role(UserRole.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  async detail(@Param('employeeId') employeeId: string) {
    const employee = await this.employeeService.detail(employeeId)

    return employee
  }

  @Delete(':employeeId')
  @Role(UserRole.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  async delete(@Param('employeeId') employeeId: string) {
    const employee = await this.employeeService.delete(employeeId)

    return employee
  }
}
