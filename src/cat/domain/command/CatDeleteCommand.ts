import { BaseEntityDeleteCommand } from '../../../common/domain/command/BaseEntityDeleteCommand';

export class CatDeleteCommand implements BaseEntityDeleteCommand {
  public readonly id: string | undefined = undefined;

  public constructor(args: Partial<CatDeleteCommand>) {
    Object.assign(this, args);
  }
}
