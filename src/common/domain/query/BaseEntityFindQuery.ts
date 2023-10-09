import { BaseEntitySortKeyAndOrderType } from '../model/BaseEntitySortKeyAndOrderType';

export interface BaseEntityFindQuery {
  ids: string[] | undefined;
  sortKeyAndOrderTypes: BaseEntitySortKeyAndOrderType[] | undefined;
}
