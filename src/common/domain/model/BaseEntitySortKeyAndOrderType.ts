import { OrderType } from './OrderType';

export interface BaseEntitySortKeyAndOrderType {
  createdAt?: OrderType;
  createdById?: OrderType;
  id?: OrderType;
  updatedAt?: OrderType;
  updatedById?: OrderType;
}
