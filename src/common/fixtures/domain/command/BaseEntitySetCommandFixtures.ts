import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';

export class BaseEntitySetCommandFixtures {
  public static get any(): BaseEntitySetCommand {
    const baseEntitySetCommand: BaseEntitySetCommand = {};

    return baseEntitySetCommand;
  }
}
