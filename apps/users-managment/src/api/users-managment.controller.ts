import { Controller, Get } from '@nestjs/common';
import { UsersManagmentService } from '../users-managment.service';

@Controller()
export class UsersManagmentController {
  constructor(private readonly usersManagmentService: UsersManagmentService) {}

  @Get()
  getHello(): string {
    return this.usersManagmentService.getHello();
  }
}
