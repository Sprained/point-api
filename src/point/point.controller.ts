import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import * as moment from 'moment'

import { EmployeesService } from 'src/employees/employees.service'
import { Role } from 'src/auth/decorators/role.decorator'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { PointService } from './point.service'
import { CreatePointDto } from './point.dto'
import { UserRole } from 'src/enums/user'
import { Type } from 'src/enums/point'

@Controller('point')
export class PointController {
  constructor(
    private pointService: PointService,
    private employeeService: EmployeesService
  ) {}

  @Post()
  @Role(UserRole.EMPLOYEE)
  @UseGuards(AuthGuard(), RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(@Body() createPointDto: CreatePointDto, @Req() req) {
    const employee = await this.employeeService.getEmployeeByUserId(req.user.id)
    const oldPoint = await this.pointService.getLastPointByEmployeeId(employee._id)
    
    createPointDto.employee = employee._id
    createPointDto.datetime = new Date()
    if(!oldPoint || oldPoint.type === Type.OUTPUT) {
      createPointDto.type = Type.INPUT
    } else {
      createPointDto.type = Type.OUTPUT
    }

    await this.pointService.create(createPointDto)

    if(oldPoint && oldPoint.type === Type.INPUT) {
      const oldDate = moment(oldPoint.datetime, 'HH:mm:ss')
      const newDate = moment(createPointDto.datetime, 'HH:mm:ss')

      const diff = moment.duration(newDate.diff(oldDate))
      
      const hours = moment(
        employee.hours ? employee.hours : '00:00', 'HH:mm'
      )
      hours.add(diff)
      employee.hours = hours.format('HH:mm')
      await employee.save()
    }
  }
}
