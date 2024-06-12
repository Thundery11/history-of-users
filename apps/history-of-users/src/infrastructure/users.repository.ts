import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/users-entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../api/dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async save(user: User): Promise<User> {
    try {
      return await this.usersRepository.save(user);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    try {
      const result = await this.usersRepository.update(
        { id: id },
        { problems: updateUserDto.problems },
      );
      return (await result.affected) === 1;
    } catch (e) {
      throw new Error(e);
    }
  }
}
