import { CatSetCommand } from './CatSetCommand';
import { BaseEntityUpdateOneCommand } from '../../../common/domain/command/BaseEntityUpdateOneCommand';
import { CatFindQuery } from '../query/CatFindQuery';

export class CatUpdateOneCommand implements BaseEntityUpdateOneCommand {
  public constructor(
    public readonly findQuery: CatFindQuery,
    public readonly setCommand: CatSetCommand,
  ) {}
}
