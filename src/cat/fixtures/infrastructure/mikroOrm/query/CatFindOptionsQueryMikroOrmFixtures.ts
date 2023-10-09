import { FindOptions } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';

export class CatFindOptionsQueryMikroOrmFixtures {
  public static get any(): FindOptions<CatMikroOrm> {
    const catFindOptionsQueryMikroOrm: FindOptions<CatMikroOrm> = {};

    return catFindOptionsQueryMikroOrm;
  }
}
