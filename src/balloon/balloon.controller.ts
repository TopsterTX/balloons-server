import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Balloon, Prisma } from '@prisma/client';
import { BalloonsService } from './balloon.service';

@Controller('balloon')
export class BalloonsController {
  constructor(private readonly balloonService: BalloonsService) {}

  @Get()
  findAll(): Promise<Balloon[]> {
    return this.balloonService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Balloon | string> {
    return this.balloonService.findByParam(Number(id));
  }

  @Post()
  create(@Body() data: Prisma.BalloonCreateInput): Promise<Balloon | string> {
    return this.balloonService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.BalloonCreateInput,
  ): Promise<Balloon | string> {
    return this.balloonService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Balloon | string> {
    return this.balloonService.remove(Number(id));
  }
}
