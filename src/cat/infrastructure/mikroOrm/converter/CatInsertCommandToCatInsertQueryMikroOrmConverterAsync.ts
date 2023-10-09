import { RequiredEntityData } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync } from './CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatInsertCommandToCatInsertQueryMikroOrmConverterAsync extends BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync<
  CatInsertCommand,
  RequiredEntityData<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync)
    catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync: ConverterAsync<
      CatInsertOneCommand,
      RequiredEntityData<CatMikroOrm>
    >,
  ) {
    super(catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync);
  }
}
