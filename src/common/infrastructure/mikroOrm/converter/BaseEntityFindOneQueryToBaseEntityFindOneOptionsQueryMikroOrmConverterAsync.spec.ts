import { FindOneOptions, QueryOrderMap } from '@mikro-orm/core';

import { BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync } from './BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync';
import { Converter } from '../../../domain/converter/Converter';
import { BaseEntitySortKeyAndOrderType } from '../../../domain/model/BaseEntitySortKeyAndOrderType';
import { BaseEntityFindOneQuery } from '../../../domain/query/BaseEntityFindOneQuery';
import { BaseEntityFindOneQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindOneQueryFixtures';
import { BaseEntityFindOneOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindOneOptionsQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsyncTest extends BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync<
  BaseEntityFindOneQuery,
  FindOneOptions<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityFindOneOptionsQueryMikroOrmMock: jest.Mock<
      Promise<FindOneOptions<BaseEntityMikroOrm>>
    >,
    convertToBaseEntityQueryOrderMapMikroOrmMock: jest.Mocked<
      Converter<BaseEntitySortKeyAndOrderType[], QueryOrderMap<BaseEntityMikroOrm>[]>
    >,
  ) {
    super(convertToBaseEntityQueryOrderMapMikroOrmMock);
  }

  protected async convertToSpecificEntityFindOneOptionsQueryMikroOrm(
    input: BaseEntityFindOneQuery,
    baseEntityFindOneOptionsQueryMikroOrm: FindOneOptions<BaseEntityMikroOrm>,
  ): Promise<FindOneOptions<BaseEntityMikroOrm>> {
    return this.convertToEntityFindOneOptionsQueryMikroOrmMock(input, baseEntityFindOneOptionsQueryMikroOrm);
  }
}

describe(BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityFindOneOptionsQueryMikroOrmMock: jest.Mock<Promise<FindOneOptions<BaseEntityMikroOrm>>>;
  let baseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync: BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsyncTest;
  let baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock: jest.Mocked<
    Converter<BaseEntitySortKeyAndOrderType[], QueryOrderMap<BaseEntityMikroOrm>[]>
  >;

  beforeAll(() => {
    convertToEntityFindOneOptionsQueryMikroOrmMock = jest.fn<Promise<FindOneOptions<BaseEntityMikroOrm>>, unknown[]>();
    baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock = {
      convert: jest.fn(),
    };

    baseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync =
      new BaseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsyncTest(
        convertToEntityFindOneOptionsQueryMikroOrmMock,
        baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let baseEntityFindOneQueryFixture: BaseEntityFindOneQuery;
      let baseEntityFindOneOptionsQueryMikroOrmFixture: FindOneOptions<BaseEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        baseEntityFindOneQueryFixture = BaseEntityFindOneQueryFixtures.withSortKeyAndOrderTypes;
        baseEntityFindOneOptionsQueryMikroOrmFixture = BaseEntityFindOneOptionsQueryMikroOrmFixtures.withOrderBy;

        baseEntitySortKeyAndOrderTypeArrayToBaseEntityQueryOrderMapMikroOrmArrayConverterMock.convert.mockReturnValueOnce(
          baseEntityFindOneOptionsQueryMikroOrmFixture.orderBy as QueryOrderMap<BaseEntityMikroOrm>[],
        );

        convertToEntityFindOneOptionsQueryMikroOrmMock.mockResolvedValueOnce(
          baseEntityFindOneOptionsQueryMikroOrmFixture,
        );

        result =
          await baseEntityFindOneQueryToBaseEntityFindOneOptionsQueryMikroOrmConverterAsync.convert(
            baseEntityFindOneQueryFixture,
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
        ).toHaveBeenCalledWith(baseEntityFindOneQueryFixture.sortKeyAndOrderTypes);
      });

      it('should call convertToEntityFindOneOptionsQueryMikroOrm()', () => {
        expect(convertToEntityFindOneOptionsQueryMikroOrmMock).toHaveBeenCalledTimes(1);
        expect(convertToEntityFindOneOptionsQueryMikroOrmMock).toHaveBeenCalledWith(
          baseEntityFindOneQueryFixture,
          baseEntityFindOneOptionsQueryMikroOrmFixture,
        );
      });

      it('should return a FindOneOptions<BaseEntityMikroOrm>', () => {
        expect(result).toStrictEqual(baseEntityFindOneOptionsQueryMikroOrmFixture);
      });
    });
  });
});
