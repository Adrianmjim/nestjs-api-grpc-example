import { Injectable } from '@nestjs/common';

import { ManagerAsync } from './ManagerAsync';
import { DeleteAdapter } from '../adapter/DeleteAdapter';

@Injectable()
export class DeleteManager<TCommand> implements ManagerAsync<TCommand, void> {
  public constructor(private readonly deleteAdapter: DeleteAdapter<TCommand>) {}

  public async manage(command: TCommand): Promise<void> {
    await this.deleteAdapter.delete(command);
  }
}
