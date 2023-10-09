import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../infrastructure/mikroOrm/model/BaseEntityMikroOrm';

export class BaseEntityQueryOrderMapMikroOrmFixtures {
  public static get any(): QueryOrderMap<BaseEntityMikroOrm> {
    const baseEntitySortKeyAndOrderType: QueryOrderMap<BaseEntityMikroOrm> = {
      id: QueryOrder.ASC,
    };

    return baseEntitySortKeyAndOrderType;
  }

  public static get withCreatedAt(): QueryOrderMap<BaseEntityMikroOrm> {
    const baseEntitySortKeyAndOrderType: QueryOrderMap<BaseEntityMikroOrm> = {
      createdAt: QueryOrder.ASC,
    };

    return baseEntitySortKeyAndOrderType;
  }

  public static get withId(): QueryOrderMap<BaseEntityMikroOrm> {
    const baseEntitySortKeyAndOrderType: QueryOrderMap<BaseEntityMikroOrm> = {
      id: QueryOrder.ASC,
    };

    return baseEntitySortKeyAndOrderType;
  }

  public static get withUpdatedAt(): QueryOrderMap<BaseEntityMikroOrm> {
    const baseEntitySortKeyAndOrderType: QueryOrderMap<BaseEntityMikroOrm> = {
      updatedAt: QueryOrder.DESC,
    };

    return baseEntitySortKeyAndOrderType;
  }
}
