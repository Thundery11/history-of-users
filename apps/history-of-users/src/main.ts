// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { appSettings } from './settings/app-settings';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//   //   AppModule,
//   //   {
//   //     transport: Transport.RMQ,
//   //     options: {
//   //       urls: ['amqp://localhost:5672'],
//   //       queue: 'cats_queue',
//   //       queueOptions: {
//   //         durable: false,
//   //       },
//   //     },
//   //   },
//   // );
//   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//     AppModule,
//     {
//       transport: Transport.RMQ,
//       options: {
//         urls: ['amqp://localhost:5672'],
//         queue: 'history_queue',
//         queueOptions: {
//           durable: true,
//         },
//       },
//     },
//   );
//   // const app = await NestFactory.create(AppModule);
//   appSettings(app);
//   // const port = 3000;
//   // await app.listen();
//   // console.log('app listen at port :', port);
//   await app.startAllMicroservices();
//   await app.listen(3000);
// }
// bootstrap();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

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
  await app.listen(3000);

  console.log('User Service is listening on port 3000');
}

bootstrap();
