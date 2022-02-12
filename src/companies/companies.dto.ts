import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  corporateName: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  cnpj: string

  @IsNotEmpty()
  @IsString()
  phone: string

  user: string
}