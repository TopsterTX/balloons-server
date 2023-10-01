import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Balloon, Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class BalloonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Balloon[]> {
    try {
      const balloons = await this.prisma.balloon.findMany();

      if (balloons.length) {
        return balloons;
      }

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Balloons not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error occured when find balloons',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async findByParam(id: number): Promise<Balloon> {
    try {
      const balloon = await this.prisma.balloon.findUnique({
        where: { id },
      });

      if (balloon) {
        return balloon;
      }

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Balloon not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error occured when find balloon',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async create(data: Prisma.BalloonCreateInput): Promise<Balloon | string> {
    try {
      return await this.prisma.balloon.create({
        data,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error occured when create balloon',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async update(
    id: number,
    data: Prisma.BalloonCreateInput,
  ): Promise<Balloon | string> {
    try {
      const currentBalloon = await this.prisma.balloon.findUnique({
        where: { id },
      });

      if (!currentBalloon)
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Balloon not found',
          },
          HttpStatus.BAD_REQUEST,
        );

      return await this.prisma.balloon.update({
        data,
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error occured when update balloon',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async remove(id: number): Promise<Balloon | string> {
    try {
      const currentBalloon = await this.prisma.balloon.findUnique({
        where: { id },
      });
      if (!currentBalloon)
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Balloon not found',
          },
          HttpStatus.BAD_REQUEST,
        );
      return await this.prisma.balloon.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error occured when remove balloon',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
