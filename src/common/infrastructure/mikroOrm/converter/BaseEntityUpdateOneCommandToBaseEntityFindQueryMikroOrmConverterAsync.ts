import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export class BaseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  TInput extends BaseEntityUpdateOneCommand,
  TOutput extends ObjectQuery<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync: ConverterAsync<
      BaseEntityFindQuery,
      TOutput
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityFindQueryMikroOrm: TOutput =
      await this.baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert(input.findQuery);

    return baseEntityFindQueryMikroOrm;
  }
}
