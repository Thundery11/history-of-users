import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryOfUsers } from '../domain/history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryRepository {
  constructor(
    @InjectRepository(HistoryOfUsers)
    private historyRepo: Repository<HistoryOfUsers>,
  ) {}
  async save(history: HistoryOfUsers) {
    return await this.historyRepo.save(history);
  }
}
