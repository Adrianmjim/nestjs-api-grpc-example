import { ObjectQuery } from '@mikro-orm/core';

import { AnyEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/AnyEntityMikroOrm';

export class AnyEntityFindQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<AnyEntityMikroOrm> {
    const anyEntityFindQueryMikroOrm: ObjectQuery<AnyEntityMikroOrm> = {};

    return anyEntityFindQueryMikroOrm;
  }
}
