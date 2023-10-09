import { CatInsertOneCommand } from './CatInsertOneCommand';
import { BaseEntityInsertCommand } from '../../../common/domain/command/BaseEntityInsertCommand';

export class CatInsertCommand implements BaseEntityInsertCommand {
  public constructor(public readonly commands: CatInsertOneCommand[]) {}
}
