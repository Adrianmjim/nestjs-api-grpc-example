import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';

import { InsertOneCommandHandler } from '../../../common/application/commandHandler/InsertOneCommandHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { CatInsertOneCommand } from '../../domain/command/CatInsertOneCommand';
import { InsertOneCatManager } from '../../domain/manager/InsertOneCatManager';
import { Cat } from '../../domain/model/Cat';

@CommandHandler(CatInsertOneCommand)
export class CatInsertOneCommandHandler extends InsertOneCommandHandler<CatInsertOneCommand, Cat> {
  public constructor(
    @Inject(InsertOneCatManager)
    insertOneCatManager: ManagerAsync<CatInsertOneCommand, Cat>,
  ) {
    super(insertOneCatManager);
  }
}
