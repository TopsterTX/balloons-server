import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { BalloonsModule } from 'balloons/balloons.module';
import { LoggerMiddleware, ReqIdMiddleware } from 'middlewares/index';
import { getWinstonConfig } from 'config/index';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    BalloonsModule,
    WinstonModule.forRoot(getWinstonConfig()),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ReqIdMiddleware, LoggerMiddleware).forRoutes('*');
  }
}
