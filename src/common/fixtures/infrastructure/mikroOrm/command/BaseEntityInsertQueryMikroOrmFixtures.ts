import { RequiredEntityData } from '@mikro-orm/core';

import { BaseEntityInsertOneQueryMikroOrmFixtures } from './BaseEntityInsertOneQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntityInsertQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<BaseEntityMikroOrm>[] {
    const baseEntityInsertQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>[] = [];

    return baseEntityInsertQueryMikroOrm;
  }

  public static get withBaseEntityInsertOneQueryMikroOrm(): RequiredEntityData<BaseEntityMikroOrm>[] {
    const baseEntityInsertQueryMikroOrm: RequiredEntityData<BaseEntityMikroOrm>[] = [
      ...this.any,
      BaseEntityInsertOneQueryMikroOrmFixtures.any,
    ];

    return baseEntityInsertQueryMikroOrm;
  }
}
