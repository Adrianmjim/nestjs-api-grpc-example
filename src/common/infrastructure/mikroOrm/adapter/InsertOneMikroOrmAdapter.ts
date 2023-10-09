import { AnyEntity, EntityManager, EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { InsertOneAdapter } from '../../../domain/adapter/InsertOneAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

@Injectable()
export class InsertOneMikroOrmAdapter<TCommand, TModelDb extends AnyEntity, TModel>
  implements InsertOneAdapter<TCommand, TModel>
{
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly insertOneCommandToInsertOneQueryMikroOrmConverterAsync: ConverterAsync<
      TCommand,
      RequiredEntityData<TModelDb>
    >,
    private readonly modelDbToModelConverterAsync: ConverterAsync<TModelDb, TModel>,
  ) {}

  public async insertOne(command: TCommand): Promise<TModel> {
    const insertOneQueryMikroOrm: RequiredEntityData<TModelDb> =
      await this.insertOneCommandToInsertOneQueryMikroOrmConverterAsync.convert(command);

    const modelDb: TModelDb = this.entityRepository.create(insertOneQueryMikroOrm);

    const entityManager: EntityManager = this.entityRepository.getEntityManager();

    try {
      await entityManager.persistAndFlush(modelDb);
    } catch (error: unknown) {
      if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.FOREIGN_KEY_VIOLATION])) {
        throw new InvalidArgumentException('Foreign key violation');
      } else if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.UNIQUE_VIOLATION])) {
        throw new InvalidArgumentException('Duplicated entity');
      } else {
        throw error;
      }
    }

    const model: TModel = await this.modelDbToModelConverterAsync.convert(modelDb);

    return model;
  }
}
