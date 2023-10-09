import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { Converter } from '../../../../common/domain/converter/Converter';
import { OrderType } from '../../../../common/domain/model/OrderType';
import { BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter';
import { OrderTypeToQueryOrderMikroOrmConverter } from '../../../../common/infrastructure/mikroOrm/converter/OrderTypeToQueryOrderMikroOrmConverter';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatSortKeyAndOrderType } from '../../../domain/model/CatSortKeyAndOrderType';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter extends BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter<
  CatSortKeyAndOrderType,
  QueryOrderMap<CatMikroOrm>
> {
  public constructor(
    @Inject(OrderTypeToQueryOrderMikroOrmConverter)
    orderTypeToQueryOrderMikroOrmConverter: Converter<OrderType, QueryOrder>,
  ) {
    super(orderTypeToQueryOrderMikroOrmConverter);
  }

  protected convertToSpecificEntityQueryOrderMapMikroOrm(
    _input: CatSortKeyAndOrderType,
    baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm>,
  ): QueryOrderMap<CatMikroOrm> {
    const catQueryOrderMapMikroOrm: QueryOrderMap<CatMikroOrm> = {
      ...baseEntityQueryOrderMapMikroOrm,
    };

    return catQueryOrderMapMikroOrm;
  }
}
