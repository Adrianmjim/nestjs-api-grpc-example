import { Injectable } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Manager } from '../../domain/manager/Manager';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

@Injectable()
export class InsertCommandHandler<TCommand extends ICommand, TModel> implements ICommandHandler<TCommand, TModel[]> {
  public constructor(private readonly insertManager: Manager<TCommand, TModel[]> | ManagerAsync<TCommand, TModel[]>) {}

  public async execute(command: TCommand): Promise<TModel[]> {
    return this.insertManager.manage(command);
  }
}
