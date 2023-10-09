import { ObjectQuery } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';

export class CatDeleteQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<CatMikroOrm> {
    const catDeleteQueryMikroOrm: ObjectQuery<CatMikroOrm> = {};

    return catDeleteQueryMikroOrm;
  }
}
