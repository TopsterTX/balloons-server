import { Injectable } from '@nestjs/common';
import { Balloon, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BalloonsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Balloon[]> {
    try {
      return await this.prisma.balloon.findMany();
    } catch (error) {
      console.error(error);
    }
  }

  async findByParam(id: number): Promise<Balloon> {
    try {
      return await this.prisma.balloon.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async create(data: Prisma.BalloonCreateInput): Promise<Balloon | string> {
    try {
      return await this.prisma.balloon.create({
        data,
      });
    } catch (error) {
      console.error(error);
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
      if (!currentBalloon) return 'error';
      return await this.prisma.balloon.update({
        data,
        where: { id },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number): Promise<Balloon | string> {
    const currentBalloon = await this.prisma.balloon.findUnique({
      where: { id },
    });
    if (!currentBalloon) return 'error';
    return await this.prisma.balloon.delete({
      where: { id },
    });
  }
}
