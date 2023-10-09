import { EntityRepository, ObjectQuery, EntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { UpdateMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/UpdateMikroOrmAdapter';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateCommandToCatFindQueryMikroOrmConverterAsync } from '../converter/CatUpdateCommandToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateCommandToCatSetQueryMikroOrmConverterAsync } from '../converter/CatUpdateCommandToCatSetQueryMikroOrmConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class UpdateCatMikroOrmAdapter extends UpdateMikroOrmAdapter<CatUpdateCommand, CatMikroOrm> {
  public constructor(
    @InjectRepository(CatMikroOrm) catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatUpdateCommandToCatFindQueryMikroOrmConverterAsync)
    catUpdateCommandToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatUpdateCommand, ObjectQuery<CatMikroOrm>[]>,
    @Inject(CatUpdateCommandToCatSetQueryMikroOrmConverterAsync)
    catUpdateCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<CatUpdateCommand, EntityData<CatMikroOrm>[]>,
  ) {
    super(
      catMikroOrmRepository,
      catUpdateCommandToCatFindQueryMikroOrmConverterAsync,
      catUpdateCommandToCatSetQueryMikroOrmConverterAsync,
    );
  }
}
