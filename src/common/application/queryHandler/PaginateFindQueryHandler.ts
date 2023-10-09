import { Injectable } from '@nestjs/common';
import { IQuery, IQueryHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { Pagination } from '../../domain/model/Pagination';

@Injectable()
export class PaginateFindQueryHandler<TQuery extends IQuery, TModel>
  implements IQueryHandler<TQuery, Pagination<TModel>>
{
  public constructor(
    private readonly paginateFindManager:
      | Manager<TQuery, Pagination<TModel>>
      | ManagerAsync<TQuery, Pagination<TModel>>,
  ) {}

  public async execute(query: TQuery): Promise<Pagination<TModel>> {
    const paginationModel: Pagination<TModel> = await this.paginateFindManager.manage(query);

    return paginationModel;
  }
}
