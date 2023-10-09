import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter } from './CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatSortKeyAndOrderType } from '../../../domain/model/CatSortKeyAndOrderType';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  CatFindQuery,
  FindOptions<CatMikroOrm>
> {
  public constructor(
    @Inject(CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter)
    catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter: Converter<
      CatSortKeyAndOrderType[],
      QueryOrderMap<CatMikroOrm>[]
    >,
  ) {
    super(catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter);
  }

  protected async convertToSpecificEntityFindOptionsQueryMikroOrm(
    _input: CatFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<CatMikroOrm>> {
    const catFindOptionsQueryMikroOrm: FindOptions<CatMikroOrm> = {
      ...(baseEntityFindOptionsQueryMikroOrm as unknown as FindOptions<CatMikroOrm>),
    };

    return catFindOptionsQueryMikroOrm;
  }
}
