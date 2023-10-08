import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'modules/prisma/prisma.service';
import { BackendResponse } from 'types/index';
import { LoginResult } from './types';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<BackendResponse<LoginResult>> {
    const { password, username } = loginDto;
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found or invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { sub: user.id, username: user.username };
    return {
      success: true,
      data: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '8h',
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '1d',
        }),
      },
    };
  }

  async register(
    registrationDto: Prisma.UserCreateInput,
  ): Promise<BackendResponse> {
    const { username, password } = registrationDto;
    const existedUser = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (existedUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User already existed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...registrationDto,
        password: hashPassword,
      },
    });

    if (newUser) {
      return {
        success: true,
      };
    }
  }
}
