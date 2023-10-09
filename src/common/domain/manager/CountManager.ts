import { Injectable } from '@nestjs/common';

import { ManagerAsync } from './ManagerAsync';
import { CountAdapter } from '../adapter/CountAdapter';

@Injectable()
export class CountManager<TQuery> implements ManagerAsync<TQuery, number> {
  public constructor(private readonly countAdapter: CountAdapter<TQuery>) {}

  public async manage(query: TQuery): Promise<number> {
    const count: number = await this.countAdapter.count(query);

    return count;
  }
}
