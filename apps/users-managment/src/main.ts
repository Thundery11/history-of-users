import { NestFactory } from '@nestjs/core';
import { UsersManagmentModule } from './users-managment.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersManagmentModule);
  const port = 3002;
  await app.listen(port);
  console.log('🚀 ~ bootstrap ~ port:', port);
}
bootstrap();
