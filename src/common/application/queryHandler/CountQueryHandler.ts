import { Injectable } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class CountQueryHandler<TQuery extends IQuery> implements IQueryHandler<TQuery, number> {
  public constructor(private readonly countManager: Manager<TQuery, number> | ManagerAsync<TQuery, number>) {}

  public async execute(query: TQuery): Promise<number> {
    const count: number = await this.countManager.manage(query);

    return count;
  }
}
