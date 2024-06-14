import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersManagment } from './domain/users-managment-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersManagmentService {
  constructor(
    @InjectRepository(UsersManagment)
    private usersRepo: Repository<UsersManagment>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async addUsers() {
    for (let i = 0; i < 1000000; i++) {
      const user = new UsersManagment();
      user.firstName = `FirstName${i}`;
      user.lastName = `LastName${i}`;
      user.age = Math.floor(Math.random() * 60) + 18;
      user.gender = i % 2 === 0 ? 'male' : 'female';
      user.problems = Math.random() > 0.5;

      const useradded = await this.usersRepo.save(user);
    }
  }
}
