import { QueryOrderMap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export class BaseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter<
  TInput extends BaseEntitySortKeyAndOrderType[],
  TOutput extends QueryOrderMap<BaseEntityMikroOrm>[],
> implements Converter<TInput, TOutput>
{
  public constructor(
    private readonly baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverter: Converter<
      BaseEntitySortKeyAndOrderType,
      QueryOrderMap<BaseEntityMikroOrm>
    >,
  ) {}

  public convert(input: TInput): TOutput {
    const baseEntityQueryOrderMapMikroOrmArray: QueryOrderMap<BaseEntityMikroOrm>[] = [];

    for (const sortKeyAndOrderType of input) {
      const baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm> =
        this.baseEntitySortKeyAndOrderTypeOfToBaseEntityQueryOrderMapMikroOrmConverter.convert(sortKeyAndOrderType);

      if (Object.keys(baseEntityQueryOrderMapMikroOrm).length !== 0) {
        baseEntityQueryOrderMapMikroOrmArray.push(baseEntityQueryOrderMapMikroOrm);
      }
    }

    return baseEntityQueryOrderMapMikroOrmArray as TOutput;
  }
}
