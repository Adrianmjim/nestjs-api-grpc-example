import { Inject, Injectable } from '@nestjs/common';

import { FindAdapter } from '../../../common/domain/adapter/FindAdapter';
import { FindManager } from '../../../common/domain/manager/FindManager';
import { FindCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/FindCatMikroOrmAdapter';
import { Cat } from '../model/Cat';
import { CatFindQuery } from '../query/CatFindQuery';

@Injectable()
export class FindCatManager extends FindManager<CatFindQuery, Cat> {
  public constructor(@Inject(FindCatMikroOrmAdapter) findCatMikroOrmAdapter: FindAdapter<CatFindQuery, Cat>) {
    super(findCatMikroOrmAdapter);
  }
}
