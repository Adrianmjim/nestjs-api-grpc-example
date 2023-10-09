import { Inject, Injectable } from '@nestjs/common';

import { InsertOneAdapter } from '../../../common/domain/adapter/InsertOneAdapter';
import { InsertOneManager } from '../../../common/domain/manager/InsertOneManager';
import { InsertOneCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/InsertOneCatMikroOrmAdapter';
import { CatInsertOneCommand } from '../command/CatInsertOneCommand';
import { Cat } from '../model/Cat';

@Injectable()
export class InsertOneCatManager extends InsertOneManager<CatInsertOneCommand, Cat> {
  public constructor(
    @Inject(InsertOneCatMikroOrmAdapter)
    insertOneCatMikroOrmAdapter: InsertOneAdapter<CatInsertOneCommand, Cat>,
  ) {
    super(insertOneCatMikroOrmAdapter);
  }
}
