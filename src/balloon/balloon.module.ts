import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { BalloonsController } from './balloon.controller';
import { BalloonsService } from './balloon.service';

@Module({
  controllers: [BalloonsController],
  providers: [BalloonsService, PrismaService],
})
export class BalloonsModule {}
