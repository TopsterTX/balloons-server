import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guards';
import { BalloonsService } from './balloons.service';

@Controller('balloons')
export class BalloonsController {
  constructor(private readonly balloonService: BalloonsService) {}

  @Get()
  findAll(): ReturnType<typeof this.balloonService.findAll> {
    return this.balloonService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id') id: string,
  ): ReturnType<typeof this.balloonService.findByParam> {
    return this.balloonService.findByParam(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() data: Prisma.BalloonCreateInput,
  ): ReturnType<typeof this.balloonService.create> {
    return this.balloonService.create(data);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Prisma.BalloonUpdateInput,
  ): ReturnType<typeof this.balloonService.update> {
    return this.balloonService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string,
  ): ReturnType<typeof this.balloonService.remove> {
    return this.balloonService.remove(id);
  }
}
