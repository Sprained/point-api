import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePointDto {
  @IsNotEmpty()
  @IsNumber({},{each: true})
  loc: number[]

  datetime: Date

  employee: string

  type: string
}