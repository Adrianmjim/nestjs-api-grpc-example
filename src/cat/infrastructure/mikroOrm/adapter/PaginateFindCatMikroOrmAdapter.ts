import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { Pagination } from '../../../../common/domain/model/Pagination';
import { PaginateFindMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/PaginateFindMikroOrmAdapter';
import { Cat } from '../../../domain/model/Cat';
import { CatPaginateFindQuery } from '../../../domain/query/CatPaginateFindQuery';
import { CatMikroOrmToPaginationCatConverterAsync } from '../converter/CatMikroOrmToPaginationCatConverterAsync';
import { CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from '../converter/CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync } from '../converter/CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class PaginateFindCatMikroOrmAdapter extends PaginateFindMikroOrmAdapter<
  CatPaginateFindQuery,
  CatMikroOrm,
  Cat
> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync)
    catPaginateFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<
      CatPaginateFindQuery,
      ObjectQuery<CatMikroOrm>
    >,
    @Inject(CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync)
    catPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      CatPaginateFindQuery,
      FindOptions<CatMikroOrm>
    >,
    @Inject(CatMikroOrmToPaginationCatConverterAsync)
    catMikroOrmToPaginationCatConverterAsync: ConverterAsync<
      CatMikroOrm[],
      Pagination<Cat>,
      { query: CatPaginateFindQuery; totalItems: number }
    >,
  ) {
    super(
      catMikroOrmRepository,
      catPaginateFindQueryToCatFindQueryMikroOrmConverterAsync,
      catPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync,
      catMikroOrmToPaginationCatConverterAsync,
    );
  }
}
