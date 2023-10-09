import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class DeleteCommandHandler<TCommand extends ICommand> implements ICommandHandler<TCommand> {
  public constructor(private readonly deleteManager: Manager<TCommand, void> | ManagerAsync<TCommand, void>) {}

  public async execute(command: TCommand): Promise<void> {
    await this.deleteManager.manage(command);
  }
}
