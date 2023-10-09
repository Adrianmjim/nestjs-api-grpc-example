import { CatInsertOneCommandFixtures } from './CatInsertOneCommandFixtures';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';

export class CatInsertCommandFixtures {
  public static get any(): CatInsertCommand {
    const catInsertCommand: CatInsertCommand = new CatInsertCommand([CatInsertOneCommandFixtures.any]);

    return catInsertCommand;
  }
}
