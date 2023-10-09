import { AnyEntity, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { DeleteAdapter } from '../../../domain/adapter/DeleteAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

@Injectable()
export class DeleteMikroOrmAdapter<TCommand, TModelDb extends AnyEntity> implements DeleteAdapter<TCommand> {
  public constructor(
    private readonly entityRepository: EntityRepository<TModelDb>,
    private readonly deleteCommandToDeleteQueryMikroOrmConverterAsync: ConverterAsync<TCommand, ObjectQuery<TModelDb>>,
  ) {}

  public async delete(command: TCommand): Promise<void> {
    const deleteQueryMikroOrm: ObjectQuery<TModelDb> =
      await this.deleteCommandToDeleteQueryMikroOrmConverterAsync.convert(command);

    try {
      await this.entityRepository.nativeDelete(deleteQueryMikroOrm);
    } catch (error: unknown) {
      if (isPostgreSqlErrorWithErrorType(error, [PostgreSqlErrorType.FOREIGN_KEY_VIOLATION])) {
        throw new InvalidArgumentException('Foreign key violation');
      } else {
        throw error;
      }
    }
  }
}
