import { ObjectQuery } from '@mikro-orm/core';

import { BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from './BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityFindQuery } from '../../../domain/query/BaseEntityFindQuery';
import { BaseEntityFindQueryFixtures } from '../../../fixtures/domain/query/BaseEntityFindQueryFixtures';
import { BaseEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/BaseEntityFindQueryMikroOrmFixtures';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

class BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest extends BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  BaseEntityFindQuery,
  ObjectQuery<BaseEntityMikroOrm>
> {
  public constructor(
    private readonly convertToEntityFindQueryMikroOrmMock: jest.Mock<Promise<ObjectQuery<BaseEntityMikroOrm>>>,
  ) {
    super();
  }

  protected async convertToSpecificEntityFindQueryMikroOrm(
    input: BaseEntityFindQuery,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    return this.convertToEntityFindQueryMikroOrmMock(input, baseEntityFindQueryMikroOrm);
  }
}

describe(BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.name, () => {
  let convertToEntityFindQueryMikroOrmMock: jest.Mock<Promise<ObjectQuery<BaseEntityMikroOrm>>>;
  let baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync: BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest;

  beforeAll(() => {
    convertToEntityFindQueryMikroOrmMock = jest.fn<Promise<ObjectQuery<BaseEntityMikroOrm>>, unknown[]>();

    baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync =
      new BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsyncTest(convertToEntityFindQueryMikroOrmMock);
  });

  describe('.convert()', () => {
    describe('having a BaseEntityFindQuery with ids', () => {
      describe('when called', () => {
        let baseEntityFindQueryFixture: BaseEntityFindQuery;
        let baseEntityFindQueryMikroOrmFixture: ObjectQuery<BaseEntityMikroOrm>;
        let result: unknown;

        beforeAll(async () => {
          baseEntityFindQueryFixture = BaseEntityFindQueryFixtures.withIds;
          baseEntityFindQueryMikroOrmFixture = BaseEntityFindQueryMikroOrmFixtures.withIds;

          convertToEntityFindQueryMikroOrmMock.mockResolvedValueOnce(baseEntityFindQueryMikroOrmFixture);

          result =
            await baseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync.convert(baseEntityFindQueryFixture);
        });

        afterAll(() => {
          jest.clearAllMocks();
        });

        it('should call convertToEntityFindQueryMikroOrm()', () => {
          expect(convertToEntityFindQueryMikroOrmMock).toHaveBeenCalledTimes(1);
          expect(convertToEntityFindQueryMikroOrmMock).toHaveBeenCalledWith(
            baseEntityFindQueryFixture,
            baseEntityFindQueryMikroOrmFixture,
          );
        });

        it('should return a ObjectQuery<BaseEntityMikroOrm>', () => {
          expect(result).toStrictEqual(baseEntityFindQueryMikroOrmFixture);
        });
      });
    });
  });
});
