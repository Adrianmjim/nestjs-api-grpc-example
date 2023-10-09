import { AnyEntity, EntityManager, EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { InsertAdapter } from '../../../domain/adapter/InsertAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

@Injectable()
export class InsertMikroOrmAdapter<TCommand, TModelDb extends AnyEntity, TModel>
  implements InsertAdapter<TCommand, TModel>
{
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly insertCommandToInsertQueryMikroOrmConverterAsync: ConverterAsync<
      TCommand,
      RequiredEntityData<TModelDb>[]
    >,
    private readonly modelDbToModelConverterAsync: ConverterAsync<TModelDb, TModel>,
  ) {}

  public async insert(command: TCommand): Promise<TModel[]> {
    const insertQueryMikroOrm: RequiredEntityData<TModelDb>[] =
      await this.insertCommandToInsertQueryMikroOrmConverterAsync.convert(command);

    const modelsDb: TModelDb[] = insertQueryMikroOrm.map((insertOneQueryMikroOrm: RequiredEntityData<TModelDb>) =>
      this.entityRepository.create(insertOneQueryMikroOrm),
    );

    const entityManager: EntityManager = this.entityRepository.getEntityManager();

    try {
      await entityManager.persistAndFlush(modelsDb);
    } catch (error: unknown) {
      if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.FOREIGN_KEY_VIOLATION])) {
        throw new InvalidArgumentException('Foreign key violation');
      } else if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.UNIQUE_VIOLATION])) {
        throw new InvalidArgumentException('Duplicated entity');
      } else {
        throw error;
      }
    }

    const models: TModel[] = await Promise.all(
      modelsDb.map(async (modelDb: TModelDb) => this.modelDbToModelConverterAsync.convert(modelDb)),
    );

    return models;
  }
}
