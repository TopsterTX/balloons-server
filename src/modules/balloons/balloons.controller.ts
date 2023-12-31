import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { Balloon, Prisma } from '@prisma/client';
import { HttpExceptionFilter } from 'filters/httpException.filter';
import { BalloonsService } from './balloons.service';

@Controller('balloons')
@UseFilters(HttpExceptionFilter)
export class BalloonsController {
  constructor(private readonly balloonService: BalloonsService) {}

  @Get() // GET http://localhost/api/balloon
  findAll(): Promise<Balloon[]> {
    return this.balloonService.findAll();
  }

  @Get(':id') // GET http://localhost/api/balloon/2
  findById(@Param('id') id: string): Promise<Balloon | string> {
    return this.balloonService.findByParam(Number(id));
  }

  @Post() // POST http://localhost/api/balloon {}
  create(@Body() data: Prisma.BalloonCreateInput): Promise<Balloon | string> {
    return this.balloonService.create(data);
  }

  @Put(':id') // PUT http://localhost/api/balloon/2 {}
  update(
    @Param('id') id: string,
    @Body() data: Prisma.BalloonUpdateInput,
  ): Promise<Balloon | string> {
    return this.balloonService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Balloon | string> {
    return this.balloonService.remove(Number(id));
  }
}
