import { EntityData } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';

export class CatSetQueryMikroOrmFixtures {
  public static get any(): EntityData<CatMikroOrm> {
    const CatSetQueryMikroOrm: EntityData<CatMikroOrm> = {};

    return CatSetQueryMikroOrm;
  }
}
