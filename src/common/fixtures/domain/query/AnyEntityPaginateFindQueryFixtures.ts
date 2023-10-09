import { AnyEntityFindQueryFixtures } from './AnyEntityFindQueryFixtures';
import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';

export class AnyEntityPaginateFindQueryFixtures {
  public static get any(): AnyEntityPaginateFindQuery {
    const anyEntityPaginateFindQuery: AnyEntityPaginateFindQuery = {
      findQuery: AnyEntityFindQueryFixtures.any,
      paginationOptions: { limit: 10, page: 1 },
    };

    return anyEntityPaginateFindQuery;
  }
}
