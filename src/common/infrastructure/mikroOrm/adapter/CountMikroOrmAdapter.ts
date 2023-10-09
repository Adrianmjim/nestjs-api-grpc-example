import { AnyEntity, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { CountAdapter } from '../../../domain/adapter/CountAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

@Injectable()
export class CountMikroOrmAdapter<TQuery, TModelDb extends AnyEntity> implements CountAdapter<TQuery> {
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly countQueryToFindQueryMikroOrmConverterAsync: ConverterAsync<TQuery, ObjectQuery<TModelDb>>,
  ) {}

  public async count(query: TQuery): Promise<number> {
    const findQueryMikroOrm: ObjectQuery<TModelDb> =
      await this.countQueryToFindQueryMikroOrmConverterAsync.convert(query);

    const count: number = await this.entityRepository.count(findQueryMikroOrm);

    return count;
  }
}
