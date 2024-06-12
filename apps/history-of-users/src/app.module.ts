import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './api/app.controller';
import { User } from './domain/users-entity';
import { ConfigModule } from '@nestjs/config';
import { CreateUserUseCase } from './application/use-cases/create-user-use-case';
import { UsersRepository } from './infrastructure/users.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersQueryRepository } from './infrastructure/users-query-repository';
import { UpdateUserUseCase } from './application/use-cases/update-user-use-case';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  autoLoadEntities: true,
  synchronize: true,
  ssl: true,
};

const useCases = [CreateUserUseCase];
@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    CqrsModule,
  ],

  controllers: [AppController],
  providers: [
    UsersRepository,
    UsersQueryRepository,
    UpdateUserUseCase,
    ...useCases,
  ],
})
export class AppModule {}
