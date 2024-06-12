import { Module } from '@nestjs/common';
import { AppController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';

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

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
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
  controllers: [AppController],
  providers: [UsersService],
})
export class UsersModule {}
