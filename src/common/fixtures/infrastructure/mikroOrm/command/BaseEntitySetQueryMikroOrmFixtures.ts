import { EntityData } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntitySetQueryMikroOrmFixtures {
  public static get any(): EntityData<BaseEntityMikroOrm> {
    const baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm> = {};

    return baseEntitySetQueryMikroOrm;
  }
}
