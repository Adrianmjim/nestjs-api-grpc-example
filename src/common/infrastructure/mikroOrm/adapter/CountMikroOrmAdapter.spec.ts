import { EntityRepository, ObjectQuery } from '@mikro-orm/core';

import { CountMikroOrmAdapter } from './CountMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(CountMikroOrmAdapter.name, () => {
  let entityRepositoryMock: jest.Mocked<EntityRepository<ModelTest>>;
  let countQueryToFindQueryMikroOrmConverterAsyncMock: jest.Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let countMikroOrmAdapter: CountMikroOrmAdapter<QueryTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      count: jest.fn(),
    } as Partial<jest.Mocked<EntityRepository<ModelTest>>> as jest.Mocked<EntityRepository<ModelTest>>;

    countQueryToFindQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    countMikroOrmAdapter = new CountMikroOrmAdapter<QueryTest, ModelTest>(
      entityRepositoryMock,
      countQueryToFindQueryMikroOrmConverterAsyncMock,
    );
  });

  describe('.delete', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let countResultFixture: number;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {
          foo: 'foo',
        };
        countResultFixture = 1;

        countQueryToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);

        entityRepositoryMock.count.mockResolvedValueOnce(countResultFixture);

        result = await countMikroOrmAdapter.count(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call countQueryToFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(countQueryToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(countQueryToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call entityRepository.count()', () => {
        expect(entityRepositoryMock.count).toHaveBeenCalledTimes(1);
        expect(entityRepositoryMock.count).toHaveBeenCalledWith(findQueryMikroOrmTestFixture);
      });

      it('should return a number', () => {
        expect(result).toBe(countResultFixture);
      });
    });
  });
});
