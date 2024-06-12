import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './api/users.controller';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ep-sparkling-feather-a2nkv6w8.eu-central-1.aws.neon.tech',
  database: 'Blogger-platform-db',
  username: 'Blogger-platform-db_owner',
  password: 'ZEHlI8zxaqb0',
  port: 5432,
  autoLoadEntities: true,
  synchronize: true,
  ssl: true,
};
@Module({
  imports: [TypeOrmModule.forRoot(options)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
