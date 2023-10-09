import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { FindQueryHandler } from '../../../common/application/queryHandler/FindQueryHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { FindCatManager } from '../../domain/manager/FindCatManager';
import { Cat } from '../../domain/model/Cat';
import { CatFindQuery } from '../../domain/query/CatFindQuery';

@QueryHandler(CatFindQuery)
export class CatFindQueryHandler extends FindQueryHandler<CatFindQuery, Cat> {
  public constructor(
    @Inject(FindCatManager)
    findCatManager: ManagerAsync<CatFindQuery, Cat[]>,
  ) {
    super(findCatManager);
  }
}
