import { QueryOrderMap } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter } from './CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter';
import { CatSortKeyAndOrderType } from '../../../domain/model/CatSortKeyAndOrderType';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverter extends BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter<
  CatSortKeyAndOrderType[],
  QueryOrderMap<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter)
    catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter: Converter<
      CatSortKeyAndOrderType,
      QueryOrderMap<CatMikroOrm>
    >,
  ) {
    super(catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter);
  }
}
