import { QueryOrder } from '@mikro-orm/core';

export class QueryOrderMikroOrmFixtures {
  public static get ASC(): QueryOrder {
    const queryOrderMikroOrm: QueryOrder = QueryOrder.ASC;

    return queryOrderMikroOrm;
  }

  public static get ASC_NULLS_FIRST(): QueryOrder {
    const queryOrderMikroOrm: QueryOrder = QueryOrder.ASC_NULLS_FIRST;

    return queryOrderMikroOrm;
  }

  public static get ASC_NULLS_LAST(): QueryOrder {
    const queryOrderMikroOrm: QueryOrder = QueryOrder.ASC_NULLS_LAST;

    return queryOrderMikroOrm;
  }

  public static get DESC(): QueryOrder {
    const queryOrderMikroOrm: QueryOrder = QueryOrder.DESC;

    return queryOrderMikroOrm;
  }

  public static get DESC_NULLS_FIRST(): QueryOrder {
    const queryOrderMikroOrm: QueryOrder = QueryOrder.DESC_NULLS_FIRST;

    return queryOrderMikroOrm;
  }

  public static get DESC_NULLS_LAST(): QueryOrder {
    const queryOrderMikroOrm: QueryOrder = QueryOrder.DESC_NULLS_LAST;

    return queryOrderMikroOrm;
  }
}
