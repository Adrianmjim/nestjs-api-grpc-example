import { AnyEntity, EntityData, EntityManager, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { UpdateOneAdapter } from '../../../domain/adapter/UpdateOneAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

@Injectable()
export class UpdateOneMikroOrmAdapter<TCommand, TModelDb extends AnyEntity> implements UpdateOneAdapter<TCommand> {
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly updateOneCommandToFindQueryMikroOrmConverterAsync: ConverterAsync<TCommand, ObjectQuery<TModelDb>>,
    private readonly updateOneCommandToSetQueryMikroOrmConverterAsync: ConverterAsync<TCommand, EntityData<TModelDb>>,
  ) {}

  public async updateOne(command: TCommand): Promise<void> {
    const findQueryMikroOrm: ObjectQuery<TModelDb> =
      await this.updateOneCommandToFindQueryMikroOrmConverterAsync.convert(command);

    const modelsDb: TModelDb[] = await this.entityRepository.find(findQueryMikroOrm);

    const setQueryMikroOrm: EntityData<TModelDb> =
      await this.updateOneCommandToSetQueryMikroOrmConverterAsync.convert(command);

    const modelsDbUpdated: TModelDb[] = modelsDb.map((modelDb: TModelDb) =>
      this.entityRepository.assign(modelDb, setQueryMikroOrm, { mergeObjects: false }),
    );

    try {
      const entityManager: EntityManager = this.entityRepository.getEntityManager();

      await entityManager.persistAndFlush(modelsDbUpdated);
    } catch (error: unknown) {
      if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.FOREIGN_KEY_VIOLATION])) {
        throw new InvalidArgumentException('Foreign key violation');
      } else if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.UNIQUE_VIOLATION])) {
        throw new InvalidArgumentException('Duplicated entity');
      } else {
        throw error;
      }
    }
  }
}
