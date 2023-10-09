import { QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Converter } from '../../../domain/converter/Converter';
import { OrderType } from '../../../domain/model/OrderType';

@Injectable()
export class OrderTypeToQueryOrderMikroOrmConverter implements Converter<OrderType, QueryOrder> {
  public convert(input: OrderType): QueryOrder {
    let queryOrder: QueryOrder;

    if (input === OrderType.ASC) {
      queryOrder = QueryOrder.ASC;
    } else if (input === OrderType.ASC_NULLS_FIRST) {
      queryOrder = QueryOrder.ASC_NULLS_FIRST;
    } else if (input === OrderType.ASC_NULLS_LAST) {
      queryOrder = QueryOrder.ASC_NULLS_LAST;
    } else if (input === OrderType.DESC) {
      queryOrder = QueryOrder.DESC;
    } else if (input === OrderType.DESC_NULLS_FIRST) {
      queryOrder = QueryOrder.DESC_NULLS_FIRST;
    } else {
      queryOrder = QueryOrder.DESC_NULLS_LAST;
    }

    return queryOrder;
  }
}
