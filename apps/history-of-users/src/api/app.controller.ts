import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { User } from '../domain/users-entity';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../application/use-cases/create-user-use-case';
import { UsersQueryRepository } from '../infrastructure/users-query-repository';
import { UpdateUserCommand } from '../application/use-cases/update-user-use-case';

@Controller('users')
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private usersQueryRepository: UsersQueryRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
  ): Promise<boolean> {
    const updatedUser = await this.commandBus.execute(
      new UpdateUserCommand(id, updateUserDto),
    );
    return updatedUser;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> {
    const users = await this.usersQueryRepository.getUsers();
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }
}
