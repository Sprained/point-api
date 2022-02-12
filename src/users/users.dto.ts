import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RecoverPasswordDto {
  @IsEmail()
  email: string
}

export class ChancePasswirdRecoverDto {
  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  passwordConfirm: string

  @IsNotEmpty()
  @IsString()
  token: string
}