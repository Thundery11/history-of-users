import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoryOfUsers } from '../domain/history.entity';
import { Repository } from 'typeorm';
import { SortingQueryParams } from '../api/dto/query-for-sorting';

@Injectable()
export class HistoryRepository {
  constructor(
    @InjectRepository(HistoryOfUsers)
    private historyRepo: Repository<HistoryOfUsers>,
  ) {}
  async save(history: HistoryOfUsers) {
    return await this.historyRepo.save(history);
  }
  async getHistory(sortingParams: SortingQueryParams) {
    const {
      sortBy = 'userId',
      sortDirection = 'desc',
      pageNumber = 1,
      pageSize = 10,
    } = sortingParams;
    const skip = (pageNumber - 1) * pageSize;
    return await this.historyRepo
      .createQueryBuilder('h')
      .select(['h'])
      .orderBy(`h.${sortBy}`, sortDirection === 'asc' ? 'ASC' : 'DESC')
      .skip(skip)
      .take(pageSize)
      .getMany();
  }
}
