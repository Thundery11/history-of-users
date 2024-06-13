import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HistoryOfUsers } from '../../domain/history.entity';
import { HistoryRepository } from '../../infrastructure/history.repository';

export class WhenUpdatedUserHistoryCommand {
  constructor(public data) {}
}
@CommandHandler(WhenUpdatedUserHistoryCommand)
export class WhenUpdatedUserHistoryUseCase
  implements ICommandHandler<WhenUpdatedUserHistoryCommand>
{
  constructor(private historyRepository: HistoryRepository) {}
  async execute(command: WhenUpdatedUserHistoryCommand): Promise<any> {
    const history = new HistoryOfUsers();

    history.addedAt = new Date().toISOString();
    history.action = command.data.action;
    history.userId = command.data.userId;
    console.log('🚀 ~ execute ~ history:', history);

    return await this.historyRepository.save(history);
  }
}
