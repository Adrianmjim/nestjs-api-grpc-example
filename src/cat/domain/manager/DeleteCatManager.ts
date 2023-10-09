import { Inject, Injectable } from '@nestjs/common';

import { DeleteAdapter } from '../../../common/domain/adapter/DeleteAdapter';
import { DeleteManager } from '../../../common/domain/manager/DeleteManager';
import { DeleteCatMikroOrmAdapter } from '../../infrastructure/mikroOrm/adapter/DeleteCatMikroOrmAdapter';
import { CatDeleteCommand } from '../command/CatDeleteCommand';

@Injectable()
export class DeleteCatManager extends DeleteManager<CatDeleteCommand> {
  public constructor(
    @Inject(DeleteCatMikroOrmAdapter)
    deleteCatMikroOrmAdapter: DeleteAdapter<CatDeleteCommand>,
  ) {
    super(deleteCatMikroOrmAdapter);
  }
}
