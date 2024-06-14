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
  async fixUserProblems() {
    const usersWithProblems = await this.usersRepo.find({
      where: { problems: true },
    });
    const count = usersWithProblems.length;

    await this.usersRepo.update({ problems: true }, { problems: false });

    return count;
  }
}
