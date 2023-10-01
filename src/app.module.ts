import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { BalloonsModule } from 'balloon/balloon.module';
import { getWinstonConfig } from 'config/index';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BalloonsModule, WinstonModule.forRoot(getWinstonConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
