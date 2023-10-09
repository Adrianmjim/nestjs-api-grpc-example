import { ObjectQuery } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';

export class CatFindQueryMikroOrmFixtures {
  public static get any(): ObjectQuery<CatMikroOrm> {
    const catFindQueryMikroOrm: ObjectQuery<CatMikroOrm> = {};

    return catFindQueryMikroOrm;
  }
}
