import { AnyEntity, EntityData, EntityManager, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { UpdateAdapter } from '../../../domain/adapter/UpdateAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

@Injectable()
export class UpdateMikroOrmAdapter<TCommand, TModelDb extends AnyEntity> implements UpdateAdapter<TCommand> {
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly updateOneCommandToFindQueryMikroOrmConverterAsync: ConverterAsync<
      TCommand,
      ObjectQuery<TModelDb>[]
    >,
    private readonly updateOneCommandToSetQueryMikroOrmConverterAsync: ConverterAsync<TCommand, EntityData<TModelDb>[]>,
  ) {}

  public async update(command: TCommand): Promise<void> {
    const findQueriesMikroOrm: ObjectQuery<TModelDb>[] =
      await this.updateOneCommandToFindQueryMikroOrmConverterAsync.convert(command);

    const setQueriesMikroOrm: EntityData<TModelDb>[] =
      await this.updateOneCommandToSetQueryMikroOrmConverterAsync.convert(command);

    const modelsDbUpdated: TModelDb[] = [];

    for (let i: number = 0; i < findQueriesMikroOrm.length; i++) {
      const findQueryMikroOrm: ObjectQuery<TModelDb> = findQueriesMikroOrm[i]!;
      const setQueryMikroOrm: EntityData<TModelDb> = setQueriesMikroOrm[i]!;

      const modelsDb: TModelDb[] = await this.entityRepository.find(findQueryMikroOrm);

      for (const modelDb of modelsDb) {
        modelsDbUpdated.push(this.entityRepository.assign(modelDb, setQueryMikroOrm, { mergeObjects: false }));
      }
    }

    const entityManager: EntityManager = this.entityRepository.getEntityManager();

    try {
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
