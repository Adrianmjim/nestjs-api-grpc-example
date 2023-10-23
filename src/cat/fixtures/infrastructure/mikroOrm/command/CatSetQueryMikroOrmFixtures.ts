import { EntityData } from '@mikro-orm/core';

import { CatMikroOrm } from '../../../../infrastructure/mikroOrm/model/CatMikroOrm';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class CatSetQueryMikroOrmFixtures {
  public static get withBornDate(): EntityData<CatMikroOrm> {
    const CatSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      bornDate: CatFixtures.any.bornDate,
    };

    return CatSetQueryMikroOrm;
  }

  public static get withColor(): EntityData<CatMikroOrm> {
    const CatSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      color: CatFixtures.any.color,
    };

    return CatSetQueryMikroOrm;
  }

  public static get withName(): EntityData<CatMikroOrm> {
    const CatSetQueryMikroOrm: EntityData<CatMikroOrm> = {
      name: CatFixtures.any.name,
    };

    return CatSetQueryMikroOrm;
  }
}
