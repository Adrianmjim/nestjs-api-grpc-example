import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync extends BaseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync<
  CatInsertOneCommand,
  RequiredEntityData<CatMikroOrm>
> {
  protected async convertToSpecificEntityInsertOneQueryMikroOrm(
    input: CatInsertOneCommand,
    baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>,
  ): Promise<RequiredEntityData<CatMikroOrm>> {
    const CatInsertOneQueryMikroOrm: RequiredEntityData<CatMikroOrm> = {
      ...baseEntityInsertOneQueryMikroOrm,
      bornDate: input.bornDate,
      color: input.color,
      name: input.name,
    };

    return CatInsertOneQueryMikroOrm;
  }
}
