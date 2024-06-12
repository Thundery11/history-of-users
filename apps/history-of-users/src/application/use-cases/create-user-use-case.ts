import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserDto } from '../../api/dto/create-user.dto';
import { UsersRepository } from '../../infrastructure/users.repository';
import { User } from '../../domain/users-entity';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class CreateUserCommand {
  constructor(public createUserDto: CreateUserDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('HISTORY_SERVICE') private readonly client: ClientProxy,
  ) {}
  async execute(command: CreateUserCommand): Promise<User> {
    const { createUserDto } = command;
    const user = new User();
    user.age = createUserDto.age;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.gender = createUserDto.gender;
    user.problems = createUserDto.problems;
    const createdUser = await this.usersRepository.save(user);
    if (!createdUser) {
      throw new BadRequestException();
    }
    this.client.emit('user_created', {
      userId: createdUser.id,
      action: 'CREATE',
    });
    return createdUser;
  }
}
