import { Inject, Injectable } from '@nestjs/common';

import { PaginateFindAdapter } from '../../../common/domain/adapter/PaginateFindAdapter';
import { PaginateFindManager } from '../../../common/domain/manager/PaginateFindManager';
import { PaginateFindCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/PaginateFindCatMikroOrmAdapter';
import { Cat } from '../model/Cat';
import { CatPaginateFindQuery } from '../query/CatPaginateFindQuery';

@Injectable()
export class PaginateFindCatManager extends PaginateFindManager<CatPaginateFindQuery, Cat> {
  public constructor(
    @Inject(PaginateFindCatMikroOrmAdapter)
    paginateFindCatMikroOrmAdapter: PaginateFindAdapter<CatPaginateFindQuery, Cat>,
  ) {
    super(paginateFindCatMikroOrmAdapter);
  }
}
