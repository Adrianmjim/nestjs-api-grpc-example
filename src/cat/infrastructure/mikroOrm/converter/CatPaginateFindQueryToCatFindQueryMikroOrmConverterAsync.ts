import { ObjectQuery } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from './CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatPaginateFindQuery } from '../../../domain/query/CatPaginateFindQuery';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatPaginateFindQueryToCatFindQueryMikroOrmConverterAsync extends AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync<
  CatPaginateFindQuery,
  ObjectQuery<CatMikroOrm>
> {
  public constructor(
    @Inject(CatFindQueryToCatFindQueryMikroOrmConverterAsync)
    catFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, ObjectQuery<CatMikroOrm>>,
  ) {
    super(catFindQueryToCatFindQueryMikroOrmConverterAsync);
  }
}
