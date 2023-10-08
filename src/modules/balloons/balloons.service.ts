import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BackendResponse } from 'types/common';
import { Balloon, Prisma } from '@prisma/client';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class BalloonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<BackendResponse<Balloon[]>> {
    const balloons = await this.prisma.balloon.findMany();

    if (!balloons.length) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Balloons not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { success: true, data: balloons };
  }

  async findByParam(id: string): Promise<BackendResponse<Balloon>> {
    const balloon = await this.prisma.balloon.findUnique({
      where: { id },
    });

    if (!balloon) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Balloon not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { success: true, data: balloon };
  }

  async create(
    data: Prisma.BalloonCreateInput,
  ): Promise<BackendResponse<Balloon>> {
    try {
      const balloon = await this.prisma.balloon.create({
        data,
      });

      return {
        success: true,
        data: balloon,
      };
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
    id: string,
    data: Prisma.BalloonUpdateInput,
  ): Promise<BackendResponse<Balloon>> {
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

    const updatedBalloon = await this.prisma.balloon.update({
      data,
      where: { id },
    });

    return {
      success: true,
      data: updatedBalloon,
    };
  }

  async remove(id: string): Promise<BackendResponse<Balloon>> {
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

    const deletedBalloon = await this.prisma.balloon.delete({
      where: { id },
    });

    return {
      success: true,
      data: deletedBalloon,
    };
  }
}
