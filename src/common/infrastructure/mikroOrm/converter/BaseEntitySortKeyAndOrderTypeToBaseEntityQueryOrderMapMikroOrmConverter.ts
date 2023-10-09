import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { OrderType } from '../../../domain/model/OrderType';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntitySortKeyAndOrderTypeToBaseEntityQueryOrderMapMikroOrmConverter<
  TInput extends BaseEntitySortKeyAndOrderType,
  TOutput extends QueryOrderMap<BaseEntityMikroOrm>,
> implements Converter<TInput, TOutput>
{
  public constructor(protected readonly orderTypeToQueryOrderMikroOrmConverter: Converter<OrderType, QueryOrder>) {}

  public convert(input: TInput): TOutput {
    const baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm> =
      this.convertToBaseEntityQueryOrderMapMikroOrm(input);

    const output: TOutput = this.convertToSpecificEntityQueryOrderMapMikroOrm(input, baseEntityQueryOrderMapMikroOrm);

    return output;
  }

  private convertToBaseEntityQueryOrderMapMikroOrm(input: TInput): QueryOrderMap<BaseEntityMikroOrm> {
    const baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm> = {};

    if (input.createdAt !== undefined) {
      baseEntityQueryOrderMapMikroOrm.createdAt = this.orderTypeToQueryOrderMikroOrmConverter.convert(input.createdAt);
    }

    if (input.id !== undefined) {
      baseEntityQueryOrderMapMikroOrm.id = this.orderTypeToQueryOrderMikroOrmConverter.convert(input.id);
    }

    if (input.updatedAt !== undefined) {
      baseEntityQueryOrderMapMikroOrm.updatedAt = this.orderTypeToQueryOrderMikroOrmConverter.convert(input.updatedAt);
    }

    return baseEntityQueryOrderMapMikroOrm;
  }

  protected abstract convertToSpecificEntityQueryOrderMapMikroOrm(
    input: TInput,
    baseEntityQueryOrderMapMikroOrm: QueryOrderMap<BaseEntityMikroOrm>,
  ): TOutput;
}
