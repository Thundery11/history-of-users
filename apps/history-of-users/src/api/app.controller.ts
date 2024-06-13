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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private usersQueryRepository: UsersQueryRepository,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Put(':id')
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
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
  @ApiResponse({
    status: 200,
    description: 'All Users returned',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<User[]> {
    const users = await this.usersQueryRepository.getUsers();
    if (!users) {
      throw new NotFoundException();
    }
    return users;
  }
}
