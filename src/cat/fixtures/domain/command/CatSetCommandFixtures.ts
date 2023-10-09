import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatFixtures } from '../model/CatFixtures';

export class CatSetCommandFixtures {
  public static get any(): CatSetCommand {
    const catSetCommand: CatSetCommand = new CatSetCommand({});

    return catSetCommand;
  }

  public static get withBornDate(): CatSetCommand {
    const catSetCommand: CatSetCommand = new CatSetCommand({
      bornDate: CatFixtures.any.bornDate,
    });

    return catSetCommand;
  }

  public static get withColor(): CatSetCommand {
    const catSetCommand: CatSetCommand = new CatSetCommand({
      color: CatFixtures.any.color,
    });

    return catSetCommand;
  }

  public static get withName(): CatSetCommand {
    const catSetCommand: CatSetCommand = new CatSetCommand({
      name: CatFixtures.any.name,
    });

    return catSetCommand;
  }
}
