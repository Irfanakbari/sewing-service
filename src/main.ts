import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '172.18.0.1',
      port: 3500,
    },
  });
  await app.listen();
}

bootstrap().then(() => console.log('Sewing Microservice is listening'));
