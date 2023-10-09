import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { FindOneQueryHandler } from '../../../common/application/queryHandler/FindOneQueryHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindOneCatManager } from '../../domain/manager/FindOneCatManager';
import { Cat } from '../../domain/model/Cat';
import { CatFindOneQuery } from '../../domain/query/CatFindOneQuery';

@QueryHandler(CatFindOneQuery)
export class CatFindOneQueryHandler extends FindOneQueryHandler<CatFindOneQuery, Cat> {
  public constructor(
    @Inject(FindOneCatManager)
    findOneCatManager: ManagerAsync<CatFindOneQuery, Cat | undefined>,
  ) {
    super(findOneCatManager);
  }
}
