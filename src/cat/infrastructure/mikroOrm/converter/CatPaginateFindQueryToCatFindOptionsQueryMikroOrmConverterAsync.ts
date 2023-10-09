import { FindOptions } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from './CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatPaginateFindQuery } from '../../../domain/query/CatPaginateFindQuery';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatPaginateFindQueryToCatFindOptionsQueryMikroOrmConverterAsync extends AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync<
  CatPaginateFindQuery,
  FindOptions<CatMikroOrm>
> {
  public constructor(
    @Inject(CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync)
    catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, FindOptions<CatMikroOrm>>,
  ) {
    super(catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync);
  }
}
