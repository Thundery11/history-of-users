import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HistoryOfUsers } from './domain/history.entity';
import { UpdateHistoryOfUsersUseCase } from './application/use-cases/update-history-of-users';
import { HistoryController } from './api/history.controller';
import { HistoryRepository } from './infrastructure/history.repository';
import { WhenUpdatedUserHistoryUseCase } from './application/use-cases/when-updated-user-use-case';
import { GetHistoryUseCase } from './application/use-cases/get-history-use-case';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

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
const useCases = [
  UpdateHistoryOfUsersUseCase,
  WhenUpdatedUserHistoryUseCase,
  GetHistoryUseCase,
];
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([HistoryOfUsers]),
    ConfigModule.forRoot(),
    CqrsModule,
    ClientsModule.register([
      {
        name: 'HISTORY-SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'history_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [HistoryController],
  providers: [HistoryRepository, ...useCases],
})
export class UsersModule {}
