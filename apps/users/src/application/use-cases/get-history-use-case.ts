import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SortingQueryParams } from '../../api/dto/query-for-sorting';
import { HistoryRepository } from '../../infrastructure/history.repository';
import { HistoryOfUsers } from '../../domain/history.entity';

export class GetHistoryCommand {
  constructor(public sortingParams: SortingQueryParams) {}
}

@CommandHandler(GetHistoryCommand)
export class GetHistoryUseCase implements ICommandHandler<GetHistoryCommand> {
  constructor(private historyRepository: HistoryRepository) {}
  async execute(command: GetHistoryCommand): Promise<HistoryOfUsers[]> {
    return await this.historyRepository.getHistory(command.sortingParams);
  }
}
