import { Injectable } from '@nestjs/common';

import { ManagerAsync } from './ManagerAsync';
import { InsertAdapter } from '../adapter/InsertAdapter';

@Injectable()
export class InsertManager<TCommand, TModel> implements ManagerAsync<TCommand, TModel[]> {
  public constructor(private readonly insertAdapter: InsertAdapter<TCommand, TModel>) {}

  public async manage(command: TCommand): Promise<TModel[]> {
    const models: TModel[] = await this.insertAdapter.insert(command);

    return models;
  }
}
