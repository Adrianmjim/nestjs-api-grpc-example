import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { InsertCommandHandler } from '../../../common/application/commandHandler/InsertCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { CatInsertCommand } from '../../domain/command/CatInsertCommand';
import { InsertCatManager } from '../../domain/manager/InsertCatManager';
import { Cat } from '../../domain/model/Cat';

@CommandHandler(CatInsertCommand)
export class CatInsertCommandHandler extends InsertCommandHandler<CatInsertCommand, Cat> {
  public constructor(
    @Inject(InsertCatManager)
    insertCatManager: ManagerAsync<CatInsertCommand, Cat[]>,
  ) {
    super(insertCatManager);
  }
}
