import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../domain/converter/Converter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntityFindOneQuery } from '../../../domain/query/BaseEntityFindOneQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  TInput extends BaseEntityFindOneQuery,
  TOutput extends FindOneOptions<any>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter: Converter<
      BaseEntitySortKeyAndOrderType[],
      QueryOrderMap<BaseEntityMikroOrm>[]
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm> =
      await this.convertToBaseEntityFindOneOptionsQueryMikroOrm(input);

    const output: TOutput = await this.convertToSpecificEntityFindOneOptionsQueryMikroOrm(
      input,
      baseEntityFindOneOptionsQueryMikroOrm,
    );

    return output;
  }

  private async convertToBaseEntityFindOneOptionsQueryMikroOrm(
    input: TInput,
  ): Promise<FindOneOptions<BaseEntityMikroOrm>> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm> = {};

    if (input.sortKeyAndOrderTypes !== undefined) {
      baseEntityFindOneOptionsQueryMikroOrm.orderBy =
        this.baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.convert(
          input.sortKeyAndOrderTypes,
        );
    }

    return baseEntityFindOneOptionsQueryMikroOrm;
  }

  protected abstract convertToSpecificEntityFindOneOptionsQueryMikroOrm(
    input: TInput,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
