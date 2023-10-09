import { AnyEntity, EntityRepository, FindOneOptions, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { FindOneAdapter } from '../../../domain/adapter/FindOneAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

@Injectable()
export class FindOneMikroOrmAdapter<TQuery, TModelDb extends AnyEntity, TModel>
  implements FindOneAdapter<TQuery, TModel>
{
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly findOneQueryToFindOneQueryMikroOrmConverterAsync: ConverterAsync<TQuery, ObjectQuery<TModelDb>>,
    private readonly findOneQueryToFindOneOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      TQuery,
      FindOneOptions<TModelDb>
    >,
    private readonly modelDbToModelConverterAsync: ConverterAsync<TModelDb, TModel>,
  ) {}

  public async findOne(query: TQuery): Promise<TModel | undefined> {
    const [findOneQueryMikroOrm, findOneOptionsQueryMikroOrm]: [ObjectQuery<TModelDb>, FindOneOptions<TModelDb>] =
      await Promise.all([
        this.findOneQueryToFindOneQueryMikroOrmConverterAsync.convert(query),
        this.findOneQueryToFindOneOptionsQueryMikroOrmConverterAsync.convert(query),
      ]);

    const modelDb: TModelDb | null = await this.entityRepository.findOne(
      findOneQueryMikroOrm,
      findOneOptionsQueryMikroOrm,
    );

    let model: TModel | undefined;

    if (modelDb === null) {
      model = undefined;
    } else {
      model = await this.modelDbToModelConverterAsync.convert(modelDb);
    }

    return model;
  }
}
