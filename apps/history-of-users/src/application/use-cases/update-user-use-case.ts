import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserDto, UpdateUserDto } from '../../api/dto/create-user.dto';
import { User } from '../../domain/users-entity';
import { UsersRepository } from '../../infrastructure/users.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class UpdateUserCommand {
  constructor(
    public id: number,
    public updateUserDto: UpdateUserDto,
  ) {}
}

@CommandHandler(UpdateUserCommand)
export class UpdateUserUseCase implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('HISTORY_SERVICE') private readonly client: ClientProxy,
  ) {}
  async execute(command: UpdateUserCommand): Promise<boolean> {
    const updatedUser = await this.usersRepository.updateUser(
      command.id,
      command.updateUserDto,
    );
    if (!updatedUser) {
      throw new NotFoundException();
    }
    this.client.emit('user_updated', {
      userId: command.id,
      action: 'UPDATE',
    });
    return updatedUser;
  }
}
