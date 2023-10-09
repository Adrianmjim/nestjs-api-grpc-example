import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { InsertOneMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/InsertOneMikroOrmAdapter';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync } from '../converter/CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class InsertOneCatMikroOrmAdapter extends InsertOneMikroOrmAdapter<CatInsertOneCommand, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm) catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync)
    catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync: ConverterAsync<
      CatInsertOneCommand,
      RequiredEntityData<CatMikroOrm>
    >,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catInsertOneCommandToCatInsertOneQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
