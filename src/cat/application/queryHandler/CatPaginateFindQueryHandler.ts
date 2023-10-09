import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';

import { PaginateFindQueryHandler } from '../../../common/application/queryHandler/PaginateFindQueryHandler';
import { ManagerAsync } from '../../../common/domain/manager/ManagerAsync';
import { Pagination } from '../../../common/domain/model/Pagination';
import { PaginateFindCatManager } from '../../domain/manager/PaginateFindCatManager';
import { Cat } from '../../domain/model/Cat';
import { CatPaginateFindQuery } from '../../domain/query/CatPaginateFindQuery';

@QueryHandler(CatPaginateFindQuery)
export class CatPaginateFindQueryHandler extends PaginateFindQueryHandler<CatPaginateFindQuery, Cat> {
  public constructor(
    @Inject(PaginateFindCatManager)
    paginateFindCatManager: ManagerAsync<CatPaginateFindQuery, Pagination<Cat>>,
  ) {
    super(paginateFindCatManager);
  }
}
