import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const HOST = process.env.HOST || 'localhost';
  const ORIGIN = process.env.ORIGIN || 'balloons-test.ru';

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ORIGIN,
  });
  app.setGlobalPrefix('api');
  await app.listen(PORT, HOST, () =>
    console.warn(`Server started on the ${HOST}:${PORT}`),
  );
}
bootstrap();
