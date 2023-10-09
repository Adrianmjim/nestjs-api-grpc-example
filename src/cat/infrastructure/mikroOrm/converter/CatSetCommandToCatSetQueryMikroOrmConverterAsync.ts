import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatSetCommandToCatSetQueryMikroOrmConverterAsync extends BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  CatSetCommand,
  EntityData<CatMikroOrm>
> {
  protected async convertToSpecificEntitySetQueryMikroOrm(
    input: CatSetCommand,
    baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
  ): Promise<EntityData<CatMikroOrm>> {
    const catSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      ...baseEntitySetQueryMikroOrm,
    };

    this.setPropertyIfNotUndefined(input, catSetQueryMikroOrm, 'bornDate', 'bornDate');

    this.setPropertyIfNotUndefined(input, catSetQueryMikroOrm, 'color', 'color');

    this.setPropertyIfNotUndefined(input, catSetQueryMikroOrm, 'name', 'name');

    return catSetQueryMikroOrm;
  }
}
