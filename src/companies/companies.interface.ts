import { Document } from 'mongoose'

export class Company extends Document {
  _id: string;
  corporateName: string
  cnpj: string
  phone: string
  user: string
  role: string
}