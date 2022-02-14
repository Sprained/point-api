import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'

import { CreatePointDto } from './point.dto'
import { Point } from './point.interface'

@Injectable()
export class PointService {
  constructor(
    @InjectModel('Points') private point: Model<Point>
  ) {}

  async create(createPointDto: CreatePointDto) {
    const point = new this.point(createPointDto)
    await point.save()
  }

  async getLastPointByEmployeeId(employeeId: string) {
    return await this.point.findOne({ employee: employeeId }).sort({createdAt: -1})
  }
}
