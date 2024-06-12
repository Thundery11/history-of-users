import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
    return this.usersService.getHello();
  }
  @EventPattern('user_created')
  async handleUserCreated(data) {
    // await this.actionService.create({
    //   userId: data.userId,
    //   action: data.action,
    // });
    console.log(data);
  }
}
