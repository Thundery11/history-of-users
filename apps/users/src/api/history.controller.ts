import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateHistoryOfUsersCommand } from '../application/use-cases/update-history-of-users';
import { WhenUpdatedUserHistoryCommand } from '../application/use-cases/when-updated-user-use-case';
import { SortingQueryParams } from './dto/query-for-sorting';
import { GetHistoryCommand } from '../application/use-cases/get-history-use-case';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('History of users')
@Controller('history')
export class HistoryController {
  constructor(private commandBus: CommandBus) {}

  @Get()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'All Users returned',
  })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getHistory(@Query() sortingParams: SortingQueryParams) {
    const history = await this.commandBus.execute(
      new GetHistoryCommand(sortingParams),
    );
    return history;
  }

  @EventPattern('user_created')
  async handleUserCreated(data) {
    const history = await this.commandBus.execute(
      new UpdateHistoryOfUsersCommand(data),
    );
  }
  @EventPattern('user_updated')
  async handleUserUpdated(data) {
    const history = await this.commandBus.execute(
      new WhenUpdatedUserHistoryCommand(data),
    );
  }
}
