import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ToDo: use global pipes BEFORE interceptors
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3010);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
