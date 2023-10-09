import { BaseEntityFindQueryFixtures } from './BaseEntityFindQueryFixtures';
import { BaseEntityPaginateFindQuery } from '../../../domain/query/BaseEntityPaginateFindQuery';

export class BaseEntityPaginateFindQueryFixtures {
  public static get any(): BaseEntityPaginateFindQuery {
    const baseEntityPaginateFindQuery: BaseEntityPaginateFindQuery = {
      findQuery: BaseEntityFindQueryFixtures.any,
      paginationOptions: { limit: 10, page: 1 },
    };

    return baseEntityPaginateFindQuery;
  }
}
