import { User } from 'src/users/users.interface'
import { Document } from 'mongoose'

export class Employee extends Document {
  _id: string
  user: User
  company: string
  hours: string
}