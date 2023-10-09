import { EntityData } from '@mikro-orm/core';
import { Inject, Injectable } from '@nestjs/common';

import { CatSetCommandToCatSetQueryMikroOrmConverterAsync } from './CatSetCommandToCatSetQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync extends BaseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  CatUpdateOneCommand,
  EntityData<CatMikroOrm>
> {
  public constructor(
    @Inject(CatSetCommandToCatSetQueryMikroOrmConverterAsync)
    catSetCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<CatSetCommand, EntityData<CatMikroOrm>>,
  ) {
    super(catSetCommandToCatSetQueryMikroOrmConverterAsync);
  }
}
