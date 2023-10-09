import { CatUpdateOneCommandFixtures } from './CatUpdateOneCommandFixtures';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';

export class CatUpdateCommandFixtures {
  public static get any(): CatUpdateCommand {
    const catUpdateCommand: CatUpdateCommand = new CatUpdateCommand([CatUpdateOneCommandFixtures.any]);

    return catUpdateCommand;
  }
}
