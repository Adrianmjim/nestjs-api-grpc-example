import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';

import { CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync } from './CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync';
import { Converter } from '../../../../common/domain/converter/Converter';
import { CatSortKeyAndOrderType } from '../../../domain/model/CatSortKeyAndOrderType';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { CatFindOneQueryFixtures } from '../../../fixtures/domain/query/CatFindOneQueryFixtures';
import { CatFindOneOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/CatFindOneOptionsQueryMikroOrmFixtures';
import { CatMikroOrm } from '../model/CatMikroOrm';

describe(CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync.name, () => {
  let catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync: CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync;
  let catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock: jest.Mocked<
    Converter<CatSortKeyAndOrderType[], QueryOrderMap<CatMikroOrm>[]>
  >;

  beforeAll(() => {
    catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock = {
      convert: jest.fn(),
    };

    catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync =
      new CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync(
        catSortKeyAndOrderTypeArrayToCatQueryOrderMapMikroOrmArrayConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFindOneOptionsQueryMikroOrmFixture: FindOneOptions<CatMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        catFindOneQueryFixture = CatFindOneQueryFixtures.any;
        catFindOneOptionsQueryMikroOrmFixture = CatFindOneOptionsQueryMikroOrmFixtures.any;

        result = await catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync.convert(catFindOneQueryFixture);
      });

      it('should return a FindOneOptions<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catFindOneOptionsQueryMikroOrmFixture);
      });
    });
  });
});
