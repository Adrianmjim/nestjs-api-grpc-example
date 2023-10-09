import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter } from './CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatSortKeyAndOrderType } from '../../../domain/model/CatSortKeyAndOrderType';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync extends BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  CatFindOneQuery,
  FindOneOptions<CatMikroOrm>
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

  protected async convertToSpecificEntityFindOneOptionsQueryMikroOrm(
    _input: CatFindOneQuery,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<FindOneOptions<CatMikroOrm>> {
    const catFindOneOptionsQueryMikroOrm: FindOneOptions<CatMikroOrm> = {
      ...(baseEntityFindOneOptionsQueryMikroOrm as unknown as FindOneOptions<CatMikroOrm>),
    };

    return catFindOneOptionsQueryMikroOrm;
  }
}
