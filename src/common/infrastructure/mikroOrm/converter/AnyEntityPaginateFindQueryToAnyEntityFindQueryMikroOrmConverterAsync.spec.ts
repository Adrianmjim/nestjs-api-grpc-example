import { ObjectQuery } from '@mikro-orm/core';

import { AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync } from './AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { AnyEntityFindQuery } from '../../../domain/query/AnyEntityFindQuery';
import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';
import { AnyEntityPaginateFindQueryFixtures } from '../../../fixtures/domain/query/AnyEntityPaginateFindQueryFixtures';
import { AnyEntityFindQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/query/AnyEntityFindQueryMikroOrmFixtures';
import { AnyEntityMikroOrm } from '../model/AnyEntityMikroOrm';

describe(AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync.name, () => {
  let anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<AnyEntityFindQuery, ObjectQuery<AnyEntityMikroOrm>>
  >;
  let anyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync: AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync<
    AnyEntityPaginateFindQuery,
    ObjectQuery<AnyEntityMikroOrm>
  >;

  beforeAll(() => {
    anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    anyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync =
      new AnyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync(
        anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsyncMock,
      );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let anyEntityPaginateFindQueryFixture: AnyEntityPaginateFindQuery;
      let anyEntityFindQueryMikroOrmFixture: ObjectQuery<AnyEntityMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        anyEntityPaginateFindQueryFixture = AnyEntityPaginateFindQueryFixtures.any;
        anyEntityFindQueryMikroOrmFixture = AnyEntityFindQueryMikroOrmFixtures.any;

        anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          anyEntityFindQueryMikroOrmFixture,
        );

        result = await anyEntityPaginateFindQueryToAnyEntityFindQueryMikroOrmConverterAsync.convert(
          anyEntityPaginateFindQueryFixture,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(anyEntityFindQueryToAnyEntityFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(
          anyEntityPaginateFindQueryFixture.findQuery,
        );
      });

      it('should return a ObjectQuery<AnyEntityMikroOrm>', () => {
        expect(result).toStrictEqual(anyEntityFindQueryMikroOrmFixture);
      });
    });
  });
});
