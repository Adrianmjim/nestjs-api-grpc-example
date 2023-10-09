import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { AnyEntityFindQuery } from '../../../domain/query/AnyEntityFindQuery';
import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';
import { AnyEntityMikroOrm } from '../model/AnyEntityMikroOrm';

@Injectable()
export class AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync<
  TInput extends AnyEntityPaginateFindQuery,
  TOutput extends ObjectQuery<AnyEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsync: ConverterAsync<
      AnyEntityFindQuery,
      TOutput
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const anyEntityFindQueryMikroOrm: TOutput =
      await this.anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsync.convert(input.findQuery);

    return anyEntityFindQueryMikroOrm;
  }
}
