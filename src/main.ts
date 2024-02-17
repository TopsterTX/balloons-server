import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
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
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Balloon API')
    .setDescription('API for Balloons')
    .setVersion('1.0')
    .addTag('balloons')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT, HOST, () =>
    console.warn(`Server started on the ${HOST}:${PORT}`),
  );
}
bootstrap();
