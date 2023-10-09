import { BaseEntityFindOneQuery } from '../../../domain/query/BaseEntityFindOneQuery';
import { BaseEntitySortKeyAndOrderTypeFixtures } from '../model/BaseEntitySortKeyAndOrderTypeFixtures';

export class BaseEntityFindOneQueryFixtures {
  public static get any(): BaseEntityFindOneQuery {
    const baseEntityFindOneQuery: BaseEntityFindOneQuery = { ids: undefined, sortKeyAndOrderTypes: undefined };

    return baseEntityFindOneQuery;
  }

  public static get withSortKeyAndOrderTypes(): BaseEntityFindOneQuery {
    const baseEntityFindOneQuery: BaseEntityFindOneQuery = {
      ids: undefined,
      sortKeyAndOrderTypes: [BaseEntitySortKeyAndOrderTypeFixtures.any],
    };

    return baseEntityFindOneQuery;
  }
}
