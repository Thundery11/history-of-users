import { createConnection } from 'typeorm';
import { UsersManagment } from './domain/users-managment-entity';

async function populate() {
  const connection = await createConnection({
    type: 'postgres',
    host: process.env.PGHOST,
    port: 5432,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [UsersManagment],
    synchronize: true,
  });

  const userRepository = connection.getRepository(UsersManagment);

  for (let i = 0; i < 1000000; i++) {
    const user = new UsersManagment();
    user.firstName = `FirstName${i}`;
    user.lastName = `LastName${i}`;
    user.age = Math.floor(Math.random() * 60) + 18;
    user.gender = i % 2 === 0 ? 'male' : 'female';
    user.problems = Math.random() > 0.5;

    await userRepository.save(user);
  }

  await connection.close();
}

populate()
  .then(() => console.log('Users populated'))
  .catch((err) => console.error('Error populating users', err));
