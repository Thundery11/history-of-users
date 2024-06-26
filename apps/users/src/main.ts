import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync, createWriteStream } from 'fs';
import { get } from 'http';

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

  SwaggerModule.setup('swagger', app, document);

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  await app.listen(3001);
  const serverUrl = 'http://localhost:3001';
  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    // write swagger ui files
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }
  console.log('User Actions History Service is listening on port 3001');
}

bootstrap();
