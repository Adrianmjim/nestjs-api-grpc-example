import { EntityData } from '@mikro-orm/core';
import { Injectable, Inject } from '@nestjs/common';

import { CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync } from './CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatUpdateCommandToCatSetQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  CatUpdateCommand,
  EntityData<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      EntityData<CatMikroOrm>
    >,
  ) {
    super(catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync);
  }
}
