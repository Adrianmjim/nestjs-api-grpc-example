import { Injectable } from '@nestjs/common';

import { ManagerAsync } from './ManagerAsync';
import { UpdateAdapter } from '../adapter/UpdateAdapter';

@Injectable()
export class UpdateManager<TCommand> implements ManagerAsync<TCommand, void> {
  public constructor(private readonly updateAdapter: UpdateAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.updateAdapter.update(command);
  }
}
