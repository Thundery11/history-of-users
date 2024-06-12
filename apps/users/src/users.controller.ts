import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }
}
