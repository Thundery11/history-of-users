import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ep-sparkling-feather-a2nkv6w8.eu-central-1.aws.neon.tech',
  port: 5432,
  username: 'Blogger-platform-db_owner',
  password: 'ZEHlI8zxaqb0our_password',
  database: 'Blogger-platform-db',
  entities: ['./apps/users-managment/src/**/*.entity.ts'],
  migrations: ['./migration/*.ts'],
  synchronize: false,
  logging: true,
});
