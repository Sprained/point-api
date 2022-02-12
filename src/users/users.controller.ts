import { BadRequestException, Body, Controller, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'

import { ChancePasswirdRecoverDto, RecoverPasswordDto } from './users.dto'
import { UsersService } from './users.service'
import Erros from 'src/enums/errors'

@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Put('/mail/confirmation/:token')
  async validateEmail(@Param('token') token: string) {
    await this.userService.validateEmail(token)    
  }

  @Post('/password/recover')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async requestPasswordRecover(@Body() recoverPasswordDto: RecoverPasswordDto) {
    await this.userService.requestRecoverPassword(recoverPasswordDto.email)
  }

  @Put('/password/recover')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async passwordRecover(@Body() recoverPasswordDto: ChancePasswirdRecoverDto) {
    if (recoverPasswordDto.password !== recoverPasswordDto.passwordConfirm) throw new BadRequestException(Erros.DIFFERENT_SENT_PASSWORDS)
    
    await this.userService.passwordRecover(recoverPasswordDto)
  }
}
