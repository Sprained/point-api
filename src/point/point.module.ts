import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'

import { EmployeesModule } from 'src/employees/employees.module'
import { PointController } from './point.controller'
import { PointService } from './point.service'
import { PointSchema } from './point.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Points', schema: PointSchema }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EmployeesModule
  ],
  controllers: [PointController],
  providers: [PointService]
})
export class PointModule {}
