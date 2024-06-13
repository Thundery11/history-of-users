import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users.service';
import { EventPattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateHistoryOfUsersCommand } from '../application/use-cases/update-history-of-users';

@Controller()
export class HistoryController {
  constructor(
    private usersService: UsersService,
    private commandBus: CommandBus,
  ) {}

  // @Get()
  // getHello() {
  //   return this.usersService.getHello();
  // }
  @EventPattern('user_created')
  async handleUserCreated(data) {
    const history = await this.commandBus.execute(
      new UpdateHistoryOfUsersCommand(data),
    );
    // console.log(history);
  }
}
// {
//   userId: data.userId,
//   action: data.action,
// }
