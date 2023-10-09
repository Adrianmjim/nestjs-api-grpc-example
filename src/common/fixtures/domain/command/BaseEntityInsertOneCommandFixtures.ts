import { BaseEntityInsertOneCommand } from '../../../domain/command/BaseEntityInsertOneCommand';

export class BaseEntityInsertOneCommandFixtures {
  public static get any(): BaseEntityInsertOneCommand {
    const baseEntityInsertOneCommand: BaseEntityInsertOneCommand = {};

    return baseEntityInsertOneCommand;
  }
}
