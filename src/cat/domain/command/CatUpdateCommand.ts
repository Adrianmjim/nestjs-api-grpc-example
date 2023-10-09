import { CatUpdateOneCommand } from './CatUpdateOneCommand';
import { BaseEntityUpdateCommand } from '../../../common/domain/command/BaseEntityUpdateCommand';

export class CatUpdateCommand implements BaseEntityUpdateCommand {
  public constructor(public readonly commands: CatUpdateOneCommand[]) {}
}
