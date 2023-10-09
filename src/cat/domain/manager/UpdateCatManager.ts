import { Inject, Injectable } from '@nestjs/common';

import { UpdateAdapter } from '../../../common/domain/adapter/UpdateAdapter';
import { UpdateManager } from '../../../common/domain/manager/UpdateManager';
import { UpdateCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/UpdateCatMikroOrmAdapter';
import { CatUpdateCommand } from '../command/CatUpdateCommand';

@Injectable()
export class UpdateCatManager extends UpdateManager<CatUpdateCommand> {
  public constructor(@Inject(UpdateCatMikroOrmAdapter) updateCatMikroOrmAdapter: UpdateAdapter<CatUpdateCommand>) {
    super(updateCatMikroOrmAdapter);
  }
}
