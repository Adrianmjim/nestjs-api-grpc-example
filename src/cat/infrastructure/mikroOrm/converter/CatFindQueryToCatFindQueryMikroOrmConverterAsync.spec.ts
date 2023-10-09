import { ObjectQuery } from '@mikro-orm/core';

import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from './CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatFindQueryFixtures } from '../../../fixtures/domain/query/CatFindQueryFixtures';
import { CatFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/CatFindQueryMikroOrmFixtures';
import { CatMikroOrm } from '../model/CatMikroOrm';

describe(CatFindQueryToCatFindQueryMikroOrmConverterAsync.name, () => {
  let catFindQueryToCatFindQueryMikroOrmConverterAsync: CatFindQueryToCatFindQueryMikroOrmConverterAsync;

  beforeAll(() => {
    catFindQueryToCatFindQueryMikroOrmConverterAsync = new CatFindQueryToCatFindQueryMikroOrmConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catFindQueryFixture: CatFindQuery;
      let catFindQueryMikroOrmFixture: ObjectQuery<CatMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        catFindQueryFixture = CatFindQueryFixtures.any;
        catFindQueryMikroOrmFixture = CatFindQueryMikroOrmFixtures.any;

        result = await catFindQueryToCatFindQueryMikroOrmConverterAsync.convert(catFindQueryFixture);
      });

      it('should return a ObjectQuery<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catFindQueryMikroOrmFixture);
      });
    });
  });
});
