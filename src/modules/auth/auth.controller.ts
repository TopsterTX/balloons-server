import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginValidate, RegistrationValidate } from './auth.validation';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes()
  login(
    @Body(new LoginValidate()) dto: LoginDto,
  ): ReturnType<typeof this.authService.login> {
    return this.authService.login(dto);
  }

  @Post('/registration')
  @UsePipes(RegistrationValidate)
  registration(
    @Body() dto: Prisma.UserCreateInput,
  ): ReturnType<typeof this.authService.register> {
    return this.authService.register(dto);
  }
}
