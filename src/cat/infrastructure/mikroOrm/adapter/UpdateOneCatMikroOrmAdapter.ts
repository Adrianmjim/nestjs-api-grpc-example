import { EntityData, EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { UpdateOneMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/UpdateOneMikroOrmAdapter';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync } from '../converter/CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync';
import { CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync } from '../converter/CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class UpdateOneCatMikroOrmAdapter extends UpdateOneMikroOrmAdapter<CatUpdateOneCommand, CatMikroOrm> {
  public constructor(
    @InjectRepository(CatMikroOrm) catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatUpdateOneCommandToCatFindQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      ObjectQuery<CatMikroOrm>
    >,
    @Inject(CatUpdateOneCommandToCatSetQueryMikroOrmConverterAsync)
    catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync: ConverterAsync<
      CatUpdateOneCommand,
      EntityData<CatMikroOrm>
    >,
  ) {
    super(
      catMikroOrmRepository,
      catUpdateOneCommandToCatFindQueryMikroOrmConverterAsync,
      catUpdateOneCommandToCatSetQueryMikroOrmConverterAsync,
    );
  }
}
