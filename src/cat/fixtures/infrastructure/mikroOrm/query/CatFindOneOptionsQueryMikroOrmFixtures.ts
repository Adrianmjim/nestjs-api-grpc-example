import { FindOneOptions } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';

export class CatFindOneOptionsQueryMikroOrmFixtures {
  public static get any(): any {
    const catFindOneOptionsQueryMikroOrm: FindOneOptions<CatMikroOrm> = {};

    return catFindOneOptionsQueryMikroOrm;
  }
}
