import { MigrationInterface, QueryRunner } from 'typeorm';
import { UsersManagment } from '../apps/users-managment/src/domain/users-managment-entity';
import { faker } from '@faker-js/faker';

export class NewMigration1718370168944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [];
    for (let i = 0; i < 1000000; i++) {
      const user = new UsersManagment();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.age = faker.datatype.number({ min: 18, max: 100 });
      user.gender = faker.person.gender();
      user.problems = faker.datatype.boolean();
      users.push(user);
    }
    await queryRunner.manager.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
