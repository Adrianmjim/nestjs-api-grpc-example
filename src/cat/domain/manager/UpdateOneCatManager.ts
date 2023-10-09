import { Inject, Injectable } from '@nestjs/common';

import { UpdateOneAdapter } from '../../../common/domain/adapter/UpdateOneAdapter';
import { UpdateOneManager } from '../../../common/domain/manager/UpdateOneManager';
import { UpdateOneCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/UpdateOneCatMikroOrmAdapter';
import { CatUpdateOneCommand } from '../command/CatUpdateOneCommand';

@Injectable()
export class UpdateOneCatManager extends UpdateOneManager<CatUpdateOneCommand> {
  public constructor(
    @Inject(UpdateOneCatMikroOrmAdapter) updateOneCatMikroOrmAdapter: UpdateOneAdapter<CatUpdateOneCommand>,
  ) {
    super(updateOneCatMikroOrmAdapter);
  }
}
