import { RequiredEntityData } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class CatInsertOneQueryMikroOrmFixtures {
  public static get any(): RequiredEntityData<CatMikroOrm> {
    const catInsertOneQueryMikroOrm: RequiredEntityData<CatMikroOrm> = {
      bornDate: CatFixtures.any.bornDate,
      color: CatFixtures.any.color,
      name: CatFixtures.any.name,
    };

    return catInsertOneQueryMikroOrm;
  }
}
