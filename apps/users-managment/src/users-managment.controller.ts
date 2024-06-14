import { Controller, Get, Post } from '@nestjs/common';
import { UsersManagmentService } from './users-managment.service';

@Controller()
export class UsersManagmentController {
  constructor(private readonly usersManagmentService: UsersManagmentService) {}

  @Get()
  getHello(): string {
    return this.usersManagmentService.getHello();
  }
  @Post()
  async addUsers() {
    await this.usersManagmentService.addUsers();
  }
}
