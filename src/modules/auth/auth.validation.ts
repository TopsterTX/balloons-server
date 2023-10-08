import { Prisma, Role } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class LoginValidate {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;
}

export class RegistrationValidate implements Prisma.UserCreateInput {
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  role: Role;
}
