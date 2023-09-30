import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalloonsModule } from './balloons/balloons.module';

@Module({
  imports: [BalloonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
