import { BaseEntityInsertOneCommandFixtures } from './BaseEntityInsertOneCommandFixtures';
import { BaseEntityInsertCommand } from '../../../domain/command/BaseEntityInsertCommand';

export class BaseEntityInsertCommandFixtures {
  public static get any(): BaseEntityInsertCommand {
    const baseEntityInsertCommand: BaseEntityInsertCommand = {
      commands: [],
    };

    return baseEntityInsertCommand;
  }

  public static get withCommandsNotEmpty(): BaseEntityInsertCommand {
    const baseEntityInsertCommand: BaseEntityInsertCommand = {
      ...this.any,
      commands: [BaseEntityInsertOneCommandFixtures.any],
    };

    return baseEntityInsertCommand;
  }
}
