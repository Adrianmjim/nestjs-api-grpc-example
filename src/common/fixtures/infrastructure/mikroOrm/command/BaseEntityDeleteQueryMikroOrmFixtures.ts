import { ObjectQuery } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { BaseEntityMikroOrmFixtures } from '../model/BaseEntityMikroOrmFixtures';

export class BaseEntityDeleteQueryMikroOrmFixtures {
  public static get withId(): ObjectQuery<BaseEntityMikroOrm> {
    const baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = { id: BaseEntityMikroOrmFixtures.any.id };

    return baseEntityDeleteQueryMikroOrm;
  }
}
