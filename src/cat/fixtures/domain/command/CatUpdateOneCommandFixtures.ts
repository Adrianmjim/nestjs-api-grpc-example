import { CatSetCommandFixtures } from './CatSetCommandFixtures';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatFindQueryFixtures } from '../query/CatFindQueryFixtures';

export class CatUpdateOneCommandFixtures {
  public static get any(): CatUpdateOneCommand {
    const catUpdateOneCommand: CatUpdateOneCommand = new CatUpdateOneCommand(
      CatFindQueryFixtures.withIds,
      CatSetCommandFixtures.any,
    );

    return catUpdateOneCommand;
  }
}
