import { FindOneOptions } from '@mikro-orm/core';

import { BaseEntityQueryOrderMapMikroOrmFixtures } from './BaseEntityQueryOrderMapMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntityFindOneOptionsQueryMikroOrmFixtures {
  public static get any(): FindOneOptions<BaseEntityMikroOrm> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm> = {};

    return baseEntityFindOneOptionsQueryMikroOrm;
  }

  public static get withOrderBy(): FindOneOptions<BaseEntityMikroOrm> {
    const baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm> = {
      orderBy: [BaseEntityQueryOrderMapMikroOrmFixtures.any],
    };

    return baseEntityFindOneOptionsQueryMikroOrm;
  }
}
