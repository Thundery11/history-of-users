import { useContainer } from 'class-validator';
import { AppModule } from '../app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '../helpers/exception.filter';

export const appSettings = (app) => {
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      exceptionFactory: (errors) => {
        console.log(errors);
        const errorsForResponse: { message: string; field: string }[] = [];
        errors.forEach((e) => {
          const constraintsKeys = Object.keys(e.constraints!);
          constraintsKeys.forEach((cKey) => {
            errorsForResponse.push({
              message: e.constraints![cKey],
              field: e.property,
            });
          });
        });
        throw new BadRequestException(errorsForResponse);
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
};
