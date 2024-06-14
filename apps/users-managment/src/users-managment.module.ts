import { Module } from '@nestjs/common';
import { UsersManagmentService } from './users-managment.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersManagment } from './domain/users-managment-entity';
import { UsersManagmentController } from './api/users.managment.controller';
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

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([UsersManagment]),
    ConfigModule.forRoot(),
    CqrsModule,
  ],
  controllers: [UsersManagmentController],
  providers: [UsersManagmentService],
})
export class UsersManagmentModule {}
