import { Injectable } from '@nestjs/common';

import { ManagerAsync } from './ManagerAsync';
import { FindAdapter } from '../adapter/FindAdapter';

@Injectable()
export class FindManager<TQuery, TModel> implements ManagerAsync<TQuery, TModel[]> {
  public constructor(private readonly findAdapter: FindAdapter<TQuery, TModel>) {}

  public async manage(query: TQuery): Promise<TModel[]> {
    const models: TModel[] = await this.findAdapter.find(query);

    return models;
  }
}
