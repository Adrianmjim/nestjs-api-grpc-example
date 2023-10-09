import { Inject, Injectable } from '@nestjs/common';

import { InsertAdapter } from '../../../common/domain/adapter/InsertAdapter';
import { InsertManager } from '../../../common/domain/manager/InsertManager';
import { InsertCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/InsertCatMikroOrmAdapter';
import { CatInsertCommand } from '../command/CatInsertCommand';
import { Cat } from '../model/Cat';

@Injectable()
export class InsertCatManager extends InsertManager<CatInsertCommand, Cat> {
  public constructor(
    @Inject(InsertCatMikroOrmAdapter)
    insertCatMikroOrmAdapter: InsertAdapter<CatInsertCommand, Cat>,
  ) {
    super(insertCatMikroOrmAdapter);
  }
}
