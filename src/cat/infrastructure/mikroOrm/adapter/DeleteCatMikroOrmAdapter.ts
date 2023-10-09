import { EntityRepository, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { DeleteMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/DeleteMikroOrmAdapter';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync } from '../converter/CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class DeleteCatMikroOrmAdapter extends DeleteMikroOrmAdapter<CatDeleteCommand, CatMikroOrm> {
  public constructor(
    @InjectRepository(CatMikroOrm) catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatDeleteCommandToCatDeleteQueryMikroOrmConverterAsync)
    catDeleteCommandToCatDeleteQueryMikroOrmConverterAsync: ConverterAsync<CatDeleteCommand, ObjectQuery<CatMikroOrm>>,
  ) {
    super(catMikroOrmRepository, catDeleteCommandToCatDeleteQueryMikroOrmConverterAsync);
  }
}
