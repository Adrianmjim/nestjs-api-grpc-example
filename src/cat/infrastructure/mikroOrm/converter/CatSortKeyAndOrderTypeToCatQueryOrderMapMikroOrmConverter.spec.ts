import { QueryOrder, QueryOrderMap } from '@mikro-orm/core';

import { CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter } from './CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter';
import { Converter } from '../../../../common/domain/converter/Converter';
import { OrderType } from '../../../../common/domain/model/OrderType';
import { CatSortKeyAndOrderType } from '../../../domain/model/CatSortKeyAndOrderType';
import { CatSortKeyAndOrderTypeFixtures } from '../../../fixtures/domain/model/CatSortKeyAndOrderTypeFixtures';
import { CatQueryOrderMapMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/CatQueryOrderMapMikroOrmFixtures';
import { CatMikroOrm } from '../model/CatMikroOrm';

describe(CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter.name, () => {
  let orderTypeToQueryOrderMikroOrmConverterMock: jest.Mocked<Converter<OrderType, QueryOrder>>;
  let catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter: CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter;

  beforeAll(() => {
    orderTypeToQueryOrderMikroOrmConverterMock = {
      convert: jest.fn(),
    };

    catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter =
      new CatSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter(orderTypeToQueryOrderMikroOrmConverterMock);
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catSortKeyAndOrderTypeFixture: CatSortKeyAndOrderType;
      let catQueryOrderMapMikroOrmFixture: QueryOrderMap<CatMikroOrm>;
      let result: unknown;

      beforeAll(() => {
        catSortKeyAndOrderTypeFixture = CatSortKeyAndOrderTypeFixtures.any;
        catQueryOrderMapMikroOrmFixture = CatQueryOrderMapMikroOrmFixtures.any;

        result = catSortKeyAndOrderTypeToCatQueryOrderMapMikroOrmConverter.convert(catSortKeyAndOrderTypeFixture);
      });

      it('should return a QueryOrderMap<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catQueryOrderMapMikroOrmFixture);
      });
    });
  });
});
