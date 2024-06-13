import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { HistoryOfUsers } from '../../domain/history.entity';
import { HistoryRepository } from '../../infrastructure/history.repository';

export class UpdateHistoryOfUsersCommand {
  constructor(public data) {}
}
@CommandHandler(UpdateHistoryOfUsersCommand)
export class UpdateHistoryOfUsersUseCase
  implements ICommandHandler<UpdateHistoryOfUsersCommand>
{
  constructor(private historyRepository: HistoryRepository) {}
  async execute(command: UpdateHistoryOfUsersCommand): Promise<any> {
    const history = new HistoryOfUsers();
    console.log('🚀 ~ execute ~ history:', history);
    history.addedAt = new Date().toISOString();
    history.action = command.data.action;
    history.userId = command.data.userId;
    return await this.historyRepository.save(history);
  }
}
