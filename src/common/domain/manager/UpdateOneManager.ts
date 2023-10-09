import { Injectable } from '@nestjs/common';

import { ManagerAsync } from './ManagerAsync';
import { UpdateOneAdapter } from '../adapter/UpdateOneAdapter';

@Injectable()
export class UpdateOneManager<TCommand> implements ManagerAsync<TCommand, void> {
  public constructor(private readonly updateOneAdapter: UpdateOneAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.updateOneAdapter.updateOne(command);
  }
}
