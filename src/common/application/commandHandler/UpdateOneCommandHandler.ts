import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class UpdateOneCommandHandler<TCommand extends ICommand> implements ICommandHandler<TCommand> {
  public constructor(private readonly updateOneManager: Manager<TCommand, void> | ManagerAsync<TCommand, void>) {}

  public async execute(command: TCommand): Promise<void> {
    await this.updateOneManager.manage(command);
  }
}
