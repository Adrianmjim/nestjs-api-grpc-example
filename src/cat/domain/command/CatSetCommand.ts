import { BaseEntitySetCommand } from '../../../common/domain/command/BaseEntitySetCommand';
import { PartialAndRequired } from '../../../common/domain/model/PartialAndRequired';

export class CatSetCommand implements BaseEntitySetCommand {
  public readonly bornDate: Date | undefined = undefined;
  public readonly color: string | undefined = undefined;
  public readonly name: string | undefined = undefined;

  public constructor(args: PartialAndRequired<CatSetCommand, BaseEntitySetCommand>) {
    Object.assign(this, args);
  }
}
