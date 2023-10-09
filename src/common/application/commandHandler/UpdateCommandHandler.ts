import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class UpdateCommandHandler<TCommand extends ICommand> implements ICommandHandler<TCommand> {
  public constructor(private readonly updateManager: Manager<TCommand, void> | ManagerAsync<TCommand, void>) {}

  public async execute(command: TCommand): Promise<void> {
    await this.updateManager.manage(command);
  }
}
