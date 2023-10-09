import { AnyEntity, EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { PaginateFindAdapter } from '../../../domain/adapter/PaginateFindAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { Pagination } from '../../../domain/model/Pagination';

@Injectable()
export class PaginateFindMikroOrmAdapter<TQuery, TModelDb extends AnyEntity, TModel>
  implements PaginateFindAdapter<TQuery, TModel>
{
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly paginateFindQueryToFindQueryMikroOrmConverterAsync: ConverterAsync<TQuery, ObjectQuery<TModelDb>>,
    private readonly paginateFindQueryToFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      TQuery,
      FindOptions<TModelDb>
    >,
    private readonly modelsDbToPaginationModelConverterAsync: ConverterAsync<
      TModelDb[],
      Pagination<TModel>,
      { query: TQuery; totalItems: number }
    >,
  ) {}

  public async paginateFind(query: TQuery): Promise<Pagination<TModel>> {
    const [findQueryMikroOrm, findOptionsQueryMikroOrm]: [ObjectQuery<TModelDb>, FindOptions<TModelDb>] =
      await Promise.all([
        this.paginateFindQueryToFindQueryMikroOrmConverterAsync.convert(query),
        this.paginateFindQueryToFindOptionsQueryMikroOrmConverterAsync.convert(query),
      ]);

    const [modelsDb, totalItems]: [TModelDb[], number] = await this.entityRepository.findAndCount(
      findQueryMikroOrm,
      findOptionsQueryMikroOrm,
    );

    const paginationModel: Pagination<TModel> = await this.modelsDbToPaginationModelConverterAsync.convert(modelsDb, {
      query,
      totalItems,
    });

    return paginationModel;
  }
}
