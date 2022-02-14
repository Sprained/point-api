import { Document } from 'mongoose'

export class User extends Document {
  _id: string
  email: string
  password: string
  status: boolean
  confirmationToken: string
  confirmationMail: boolean
  recoverToken: string
  role: string
}