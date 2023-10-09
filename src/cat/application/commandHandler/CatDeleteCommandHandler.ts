import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { DeleteCommandHandler } from '../../../common/application/commandHandler/DeleteCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { CatDeleteCommand } from '../../domain/command/CatDeleteCommand';
import { DeleteCatManager } from '../../domain/manager/DeleteCatManager';

@CommandHandler(CatDeleteCommand)
export class CatDeleteCommandHandler extends DeleteCommandHandler<CatDeleteCommand> {
  public constructor(
    @Inject(DeleteCatManager)
    deleteCatManager: ManagerAsync<CatDeleteCommand, void>,
  ) {
    super(deleteCatManager);
  }
}
