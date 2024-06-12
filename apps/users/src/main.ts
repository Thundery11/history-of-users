import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';

// const { NestFactory } = require('@nestjs/core');
// const { MicroserviceOptions, Transport } = require('@nestjs/microservices');
// const { AppModule } = require('./app.module');
// const { ConfigService } = require('@nestjs/config');

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  // const configService = app.get(ConfigService);

  const microserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'history_queue',
      queueOptions: {
        durable: true,
      },
    },
  };

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3001);

  console.log('User Actions History Service is listening on port 3001');
}

bootstrap();
