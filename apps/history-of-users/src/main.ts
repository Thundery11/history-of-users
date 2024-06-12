import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appSettings } from './settings/app-settings';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appSettings(app);
  const port = 3000;
  await app.listen(port);
  console.log('app listen at port :', port);
}
bootstrap();
