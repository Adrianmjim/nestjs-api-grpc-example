import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync extends BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync<
  CatDeleteCommand,
  ObjectQuery<CatMikroOrm>
> {
  protected async convertToSpecificEntityDeleteQueryMikroOrm(
    _input: CatDeleteCommand,
    baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<CatMikroOrm>> {
    const CatDeleteQueryMikroOrm: ObjectQuery<CatMikroOrm> = {
      ...(baseEntityDeleteQueryMikroOrm as ObjectQuery<CatMikroOrm>),
    };

    return CatDeleteQueryMikroOrm;
  }
}
