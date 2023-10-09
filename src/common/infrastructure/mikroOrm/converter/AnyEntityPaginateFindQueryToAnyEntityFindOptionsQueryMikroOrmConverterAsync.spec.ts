import { FindOptions } from '@mikro-orm/core';

import { AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync } from './AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { AnyEntityFindQuery } from '../../../domain/query/AnyEntityFindQuery';
import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';
import { AnyEntityPaginateFindQueryFixtures } from '../../../fixtures/domain/query/AnyEntityPaginateFindQueryFixtures';
import { AnyEntityFindOptionsQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/AnyEntityFindOptionsQueryMikroOrmFixtures';
import { AnyEntityMikroOrm } from '../model/AnyEntityMikroOrm';

describe(AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync.name, () => {
  let anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<AnyEntityFindQuery, FindOptions<AnyEntityMikroOrm>>
  >;
  let anyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync: AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync<
    AnyEntityPaginateFindQuery,
    FindOptions<AnyEntityMikroOrm>
  >;

  beforeAll(() => {
    anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    anyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync =
      new AnyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync(
        anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let anyEntityPaginateFindQueryFixture: AnyEntityPaginateFindQuery;
      let anyEntityFindOptionsQueryMikroOrmFixture: FindOptions<AnyEntityMikroOrm>;
      let anyEntityFindOptionsQueryMikroOrmFixtureWithLimitAndOffset: FindOptions<AnyEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        anyEntityPaginateFindQueryFixture = AnyEntityPaginateFindQueryFixtures.any;
        anyEntityFindOptionsQueryMikroOrmFixture = AnyEntityFindOptionsQueryMikroOrmFixtures.any;
        anyEntityFindOptionsQueryMikroOrmFixtureWithLimitAndOffset =
          AnyEntityFindOptionsQueryMikroOrmFixtures.withLimitAndOffset;

        anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          anyEntityFindOptionsQueryMikroOrmFixture,
        );

        result = await anyEntityPaginateFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync.convert(
          anyEntityPaginateFindQueryFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(
          1,
        );
        expect(anyEntityFindQueryToAnyEntityFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          anyEntityPaginateFindQueryFixture.findQuery,
        );
      });

      it('should return a FindOptions<AnyEntityMikroOrm>', () => {
        expect(result).toStrictEqual(anyEntityFindOptionsQueryMikroOrmFixtureWithLimitAndOffset);
      });
    });
  });
});
