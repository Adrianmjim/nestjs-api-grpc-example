import { ObjectQuery } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityMikroOrmFixtures } from '../model/BaseEntityMikroOrmFixtures';

export class BaseEntityFindQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<BaseEntityMikroOrm> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {};

    return baseEntityFindQueryMikroOrm;
  }

  public static get withIds(): ObjectQuery<BaseEntityMikroOrm> {
    const baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {
      id: { $in: [BaseEntityMikroOrmFixtures.any.id] },
    };

    return baseEntityFindQueryMikroOrm;
  }
}
