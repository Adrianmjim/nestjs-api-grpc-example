import { Inject, Injectable } from '@nestjs/common';

import { FindOneAdapter } from '../../../common/domain/adapter/FindOneAdapter';
import { FindOneManager } from '../../../common/domain/manager/FindOneManager';
import { FindOneCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/FindOneCatMikroOrmAdapter';
import { Cat } from '../model/Cat';
import { CatFindOneQuery } from '../query/CatFindOneQuery';

@Injectable()
export class FindOneCatManager extends FindOneManager<CatFindOneQuery, Cat> {
  public constructor(
    @Inject(FindOneCatMikroOrmAdapter)
    findOneCatMikroOrmAdapter: FindOneAdapter<CatFindOneQuery, Cat>,
  ) {
    super(findOneCatMikroOrmAdapter);
  }
}
