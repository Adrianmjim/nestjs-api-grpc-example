import { FindOptions, QueryOrderMap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../domain/converter/Converter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  TInput extends BaseEntityFindQuery,
  TOutput extends FindOptions<any>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter: Converter<
      BaseEntitySortKeyAndOrderType[],
      QueryOrderMap<BaseEntityMikroOrm>[]
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> =
      await this.convertToBaseEntityFindOptionsQueryMikroOrm(input);

    const output: TOutput = await this.convertToSpecificEntityFindOptionsQueryMikroOrm(
      input,
      baseEntityFindOptionsQueryMikroOrm,
    );

    return output;
  }

  private async convertToBaseEntityFindOptionsQueryMikroOrm(input: TInput): Promise<FindOptions<BaseEntityMikroOrm>> {
    const baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm> = {};

    if (input.sortKeyAndOrderTypes !== undefined) {
      baseEntityFindOptionsQueryMikroOrm.orderBy =
        this.baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.convert(
          input.sortKeyAndOrderTypes,
        );
    }

    return baseEntityFindOptionsQueryMikroOrm;
  }

  protected abstract convertToSpecificEntityFindOptionsQueryMikroOrm(
    input: TInput,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
