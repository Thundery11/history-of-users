import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/users-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(User) private usersQueryRepository: Repository<User>,
  ) {}
  async getUsers(): Promise<User[]> {
    try {
      return await this.usersQueryRepository.find({});
    } catch (e) {
      throw new Error();
    }
  }
}
