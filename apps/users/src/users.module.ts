import { Module } from '@nestjs/common';
import { AppController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
  imports: [TypeOrmModule.forRoot(options)],
  controllers: [AppController],
  providers: [UsersService],
})
export class UsersModule {}
