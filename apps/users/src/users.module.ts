import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HistoryOfUsers } from './domain/history.entity';
import { UpdateHistoryOfUsersUseCase } from './application/use-cases/update-history-of-users';
import { HistoryController } from './api/history.controller';
import { HistoryRepository } from './infrastructure/history.repository';

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASEFORACTIONS } = process.env;

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: PGHOST,
  database: PGDATABASEFORACTIONS,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  autoLoadEntities: true,
  synchronize: true,
  ssl: true,
};
const useCases = [UpdateHistoryOfUsersUseCase];
@Module({
  imports: [
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
  providers: [UsersService, HistoryRepository, ...useCases],
})
export class UsersModule {}
