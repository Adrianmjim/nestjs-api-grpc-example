import { FindOptions, QueryOrderMap } from '@mikro-orm/core';

import { BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync } from './BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync';
import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindOptionsQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest extends BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync<
  BaseEntityFindQuery,
  FindOptions<BaseEntityMikroOrm>
> {
  public constructor(
    convertToBaseEntityQueryOrderMapMikroOrmMock: jest.Mocked<
      Converter<BaseEntitySortKeyAndOrderType[], QueryOrderMap<BaseEntityMikroOrm>[]>
    >,
    private readonly convertToEntityFindOptionsQueryMikroOrmMock: jest.Mock<Promise<FindOptions<BaseEntityMikroOrm>>>,
  ) {
    super(convertToBaseEntityQueryOrderMapMikroOrmMock);
  }

  protected async convertToSpecificEntityFindOptionsQueryMikroOrm(
    input: BaseEntityFindQuery,
    baseEntityFindOptionsQueryMikroOrm: FindOptions<BaseEntityMikroOrm>,
  ): Promise<FindOptions<BaseEntityMikroOrm>> {
    return this.convertToEntityFindOptionsQueryMikroOrmMock(input, baseEntityFindOptionsQueryMikroOrm);
  }
}

describe(BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.name, () => {
  let baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock: jest.Mocked<
    Converter<BaseEntitySortKeyAndOrderType[], QueryOrderMap<BaseEntityMikroOrm>[]>
  >;
  let convertToEntityFindOptionsQueryMikroOrmMock: jest.Mock<Promise<FindOptions<BaseEntityMikroOrm>>>;
  let baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync: BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock = {
      convert: jest.fn(),
    };
    convertToEntityFindOptionsQueryMikroOrmMock = jest.fn<Promise<FindOptions<BaseEntityMikroOrm>>, unknown[]>();

    baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync =
      new BaseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsyncTest(
        baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock,
        convertToEntityFindOptionsQueryMikroOrmMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityFindQueryFixture: BaseEntityFindQuery;
      let baseEntityFindOptionsQueryMikroOrmFixture: FindOptions<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.withSortKeyAndOrderTypes;
        baseEntityFindOptionsQueryMikroOrmFixture = BaseEntityFindOptionsQueryMikroOrmFixtures.withOrderBy;

        baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock.convert.mockReturnValueOnce(
          baseEntityFindOptionsQueryMikroOrmFixture.orderBy as QueryOrderMap<BaseEntityMikroOrm>[],
        );

        convertToEntityFindOptionsQueryMikroOrmMock.mockResolvedValueOnce(baseEntityFindOptionsQueryMikroOrmFixture);

        result =
          await baseEntityFindQueryToBaseEntityFindOptionsQueryMikroOrmConverterAsync.convert(
            baseEntityFindQueryFixture,
          );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverter.convert()', () => {
        expect(
          baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock.convert,
        ).toHaveBeenCalledTimes(1);
        expect(
          baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock.convert,
        ).toHaveBeenCalledWith(baseEntityFindQueryFixture.sortKeyAndOrderTypes);
      });

      it('should call convertToEntityFindOptionsQueryMikroOrm()', () => {
        expect(convertToEntityFindOptionsQueryMikroOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityFindOptionsQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityFindQueryFixture,
          baseEntityFindOptionsQueryMikroOrmFixture,
        );
      });

      it('should return a FindOptions<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindOptionsQueryMikroOrmFixture);
      });
    });
  });
});
