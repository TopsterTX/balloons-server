import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalloonsModule } from './balloon/balloon.module';

@Module({
  imports: [BalloonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
