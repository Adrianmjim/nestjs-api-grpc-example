import { RequiredEntityData } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntityInsertOneQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<BaseEntityMikroOrm> {
    const baseEntityInsertOneQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm> = {};

    return baseEntityInsertOneQueryMikroOrm;
  }
}
