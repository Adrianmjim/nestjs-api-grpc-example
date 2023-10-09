import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatFixtures } from '../model/CatFixtures';

export class CatFindQueryFixtures {
  public static get any(): CatFindQuery {
    const catFindQuery: CatFindQuery = new CatFindQuery({});

    return catFindQuery;
  }

  public static get withIds(): CatFindQuery {
    const catFindQuery: CatFindQuery = new CatFindQuery({
      ids: [CatFixtures.any.id],
    });

    return catFindQuery;
  }
}
