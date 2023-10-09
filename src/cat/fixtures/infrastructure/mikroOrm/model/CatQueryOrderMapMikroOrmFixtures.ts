import { QueryOrderMap } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';

export class CatQueryOrderMapMikroOrmFixtures {
  public static get any(): QueryOrderMap<CatMikroOrm> {
    const catQueryOrderMapMikroOrm: QueryOrderMap<CatMikroOrm> = {};

    return catQueryOrderMapMikroOrm;
  }
}
