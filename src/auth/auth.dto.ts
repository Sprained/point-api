import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CredentialsDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}