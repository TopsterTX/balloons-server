import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpExceptionFilter } from 'filters/index';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3001;
  const HOST = process.env.HOST || 'localhost';
  const ORIGIN = process.env.ORIGIN || 'balloons-test.ru';

  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableCors({
    origin: ORIGIN,
  });
  app.useGlobalFilters(
    new HttpExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)),
  );
  app.setGlobalPrefix('api');

  await app.listen(PORT, HOST, () =>
    console.warn(`Server started on the ${HOST}:${PORT}`),
  );
}
bootstrap();
