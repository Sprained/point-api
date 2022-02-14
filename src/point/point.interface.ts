import { Employee } from 'src/employees/employess.interface'
import { Document } from 'mongoose'

export class Point extends Document {
  _id: string
  employee: Employee
  loc: number
  datetime: Date
  type: string
}