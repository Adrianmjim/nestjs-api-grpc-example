import { EntityRepository, RequiredEntityData } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { InsertMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/InsertMikroOrmAdapter';
import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatInsertCommandToCatInsertQueryMikroOrmConverterAsync } from '../converter/CatInsertCommandToCatInsertQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class InsertCatMikroOrmAdapter extends InsertMikroOrmAdapter<CatInsertCommand, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm)
    catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatInsertCommandToCatInsertQueryMikroOrmConverterAsync)
    catInsertCommandToCatInsertQueryMikroOrmConverterAsync: ConverterAsync<
      CatInsertCommand,
      RequiredEntityData<CatMikroOrm>[]
    >,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catInsertCommandToCatInsertQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
