import { Injectable } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class FindQueryHandler<TQuery extends IQuery, TModel> implements IQueryHandler<TQuery, TModel[]> {
  public constructor(private readonly findManager: Manager<TQuery, TModel[]> | ManagerAsync<TQuery, TModel[]>) {}

  public async execute(query: TQuery): Promise<TModel[]> {
    const models: TModel[] = await this.findManager.manage(query);

    return models;
  }
}
