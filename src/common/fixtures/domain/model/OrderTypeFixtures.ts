import { OrderType } from '../../../domain/model/OrderType';

export class OrderTypeFixtures {
  public static get ASC(): OrderType {
    const orderType: OrderType = OrderType.ASC;

    return orderType;
  }

  public static get ASC_NULLS_FIRST(): OrderType {
    const orderType: OrderType = OrderType.ASC_NULLS_FIRST;

    return orderType;
  }

  public static get ASC_NULLS_LAST(): OrderType {
    const orderType: OrderType = OrderType.ASC_NULLS_LAST;

    return orderType;
  }

  public static get DESC(): OrderType {
    const orderType: OrderType = OrderType.DESC;

    return orderType;
  }

  public static get DESC_NULLS_FIRST(): OrderType {
    const orderType: OrderType = OrderType.DESC_NULLS_FIRST;

    return orderType;
  }

  public static get DESC_NULLS_LAST(): OrderType {
    const orderType: OrderType = OrderType.DESC_NULLS_LAST;

    return orderType;
  }
}
