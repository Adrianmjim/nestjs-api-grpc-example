import { ObjectQuery } from '@mikro-orm/core';
import { Injectable, Inject } from '@nestjs/common';

import { CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync } from './CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatUpdateCommandToCatFindQueryMikroOrmConverterAsync extends BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  CatUpdateCommand,
  ObjectQuery<CatMikroOrm>[]
> {
  public constructor(
    @Inject(CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      ObjectQuery<CatMikroOrm>
    >,
  ) {
    super(catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync);
  }
}
