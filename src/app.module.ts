import { Module } from '@nestjs/common';
import { BalloonsModule } from 'balloon/balloon.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BalloonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
