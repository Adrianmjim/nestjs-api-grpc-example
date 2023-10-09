import { BaseEntityDeleteCommand } from '../../../domain/command/BaseEntityDeleteCommand';
import { BaseEntityFixtures } from '../model/BaseEntityFixtures';

export class BaseEntityDeleteCommandFixtures {
  public static get withId(): BaseEntityDeleteCommand {
    const baseEntityDeleteCommand: BaseEntityDeleteCommand = { id: BaseEntityFixtures.any.id };

    return baseEntityDeleteCommand;
  }
}
