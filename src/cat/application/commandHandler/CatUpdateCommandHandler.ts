import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { UpdateCommandHandler } from '../../../common/application/commandHandler/UpdateCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { CatUpdateCommand } from '../../domain/command/CatUpdateCommand';
import { UpdateCatManager } from '../../domain/manager/UpdateCatManager';

@CommandHandler(CatUpdateCommand)
export class CatUpdateCommandHandler extends UpdateCommandHandler<CatUpdateCommand> {
  public constructor(@Inject(UpdateCatManager) updateCatManager: ManagerAsync<CatUpdateCommand, void>) {
    super(updateCatManager);
  }
}
