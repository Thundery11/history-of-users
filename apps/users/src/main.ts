import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

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
  const config = new DocumentBuilder()
    .setTitle('History of users')
    .setDescription('The history of users API description')
    .setVersion('1.0')
    .addTag('history of users')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3001);

  console.log('User Actions History Service is listening on port 3001');
}

bootstrap();
