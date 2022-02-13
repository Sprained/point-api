import { Document } from 'mongoose'

export class RefreshToken extends Document {
  _id: string
  is_revoked: boolean
  expires: Date
  user: string
}