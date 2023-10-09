import { FindOptions } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { AnyEntityFindQuery } from '../../../domain/query/AnyEntityFindQuery';
import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';

@Injectable()
export class AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync<
  TInput extends AnyEntityPaginateFindQuery,
  TOutput extends FindOptions<any>,
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      AnyEntityFindQuery,
      TOutput
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const anyEntityFindOptionsQueryMikroOrm: TOutput =
      await this.anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync.convert(input.findQuery);

    anyEntityFindOptionsQueryMikroOrm.limit = input.paginationOptions.limit;
    anyEntityFindOptionsQueryMikroOrm.offset = Math.abs(
      input.paginationOptions.limit * (input.paginationOptions.page - 1),
    );

    return anyEntityFindOptionsQueryMikroOrm;
  }
}
