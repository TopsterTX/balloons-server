import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BalloonsController } from './balloons.controller';
import { BalloonsService } from './balloons.service';

@Module({
  controllers: [BalloonsController],
  providers: [BalloonsService, PrismaService],
})
export class BalloonsModule {}
