import { AnyEntity, EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { FindAdapter } from '../../../domain/adapter/FindAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

@Injectable()
export class FindMikroOrmAdapter<TQuery, TModelDb extends AnyEntity, TModel> implements FindAdapter<TQuery, TModel> {
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly findQueryToFindQueryMikroOrmConverterAsync: ConverterAsync<TQuery, ObjectQuery<TModelDb>>,
    private readonly findQueryToFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<TQuery, FindOptions<TModelDb>>,
    private readonly modelDbToModelConverterAsync: ConverterAsync<TModelDb, TModel>,
  ) {}

  public async find(query: TQuery): Promise<TModel[]> {
    const [findQueryMikroOrm, findOptionsQueryMikroOrm]: [ObjectQuery<TModelDb>, FindOptions<TModelDb>] =
      await Promise.all([
        this.findQueryToFindQueryMikroOrmConverterAsync.convert(query),
        this.findQueryToFindOptionsQueryMikroOrmConverterAsync.convert(query),
      ]);

    const modelsDb: TModelDb[] = await this.entityRepository.find(findQueryMikroOrm, findOptionsQueryMikroOrm);

    const models: TModel[] = await Promise.all(
      modelsDb.map(async (modelDb: TModelDb) => this.modelDbToModelConverterAsync.convert(modelDb)),
    );

    return models;
  }
}
