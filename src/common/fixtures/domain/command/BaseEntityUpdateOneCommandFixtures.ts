import { BaseEntitySetCommandFixtures } from './BaseEntitySetCommandFixtures';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { BaseEntityFindQueryFixtures } from '../query/BaseEntityFindQueryFixtures';

export class BaseEntityUpdateOneCommandFixtures {
  public static get any(): BaseEntityUpdateOneCommand {
    const baseEntityUpdateOneCommand: BaseEntityUpdateOneCommand = {
      findQuery: BaseEntityFindQueryFixtures.any,
      setCommand: BaseEntitySetCommandFixtures.any,
    };

    return baseEntityUpdateOneCommand;
  }
}
