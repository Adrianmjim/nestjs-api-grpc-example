import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';

import { PaginateFindMikroOrmAdapter } from './PaginateFindMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { Pagination } from '../../../domain/model/Pagination';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(PaginateFindMikroOrmAdapter.name, () => {
  let entityRepositoryMock: jest.Mocked<EntityRepository<ModelTest>>;
  let queryTestToFindQueryMikroOrmConverterAsyncMock: jest.Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let queryTestToFindOptionsQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<QueryTest, FindOptions<ModelTest>>
  >;
  let modelsDbToPaginationModelConverterAsyncMock: jest.Mocked<
    ConverterAsync<ModelTest[], Pagination<ModelTest>, { query: QueryTest; totalItems: number }>
  >;
  let paginateFindMikroOrmAdapter: PaginateFindMikroOrmAdapter<QueryTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      findAndCount: jest.fn(),
    } as Partial<jest.Mocked<EntityRepository<ModelTest>>> as jest.Mocked<EntityRepository<ModelTest>>;

    queryTestToFindQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    queryTestToFindOptionsQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    modelsDbToPaginationModelConverterAsyncMock = {
      convert: jest.fn(),
    };

    paginateFindMikroOrmAdapter = new PaginateFindMikroOrmAdapter<QueryTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      queryTestToFindQueryMikroOrmConverterAsyncMock,
      queryTestToFindOptionsQueryMikroOrmConverterAsyncMock,
      modelsDbToPaginationModelConverterAsyncMock,
    );
  });

  describe('.find()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let findQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOptionsQueryMikroOrmTestFixture: FindOptions<ModelTest>;
      let modelTestFixtures: ModelTest[];
      let totalItemsFixture: number;
      let paginationModelTestFixture: Pagination<ModelTest>;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findQueryMikroOrmTestFixture = {};
        findOptionsQueryMikroOrmTestFixture = {};
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];
        totalItemsFixture = 0;
        paginationModelTestFixture = {
          items: modelTestFixtures,
          meta: {
            currentPage: 0,
            itemCount: 0,
            itemsPerPage: 0,
            totalItems: 0,
            totalPages: 0,
          },
        };

        queryTestToFindQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(findQueryMikroOrmTestFixture);
        queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOptionsQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.findAndCount.mockResolvedValueOnce([modelTestFixtures, totalItemsFixture]);
        modelsDbToPaginationModelConverterAsyncMock.convert.mockResolvedValueOnce(paginationModelTestFixture);

        result = await paginateFindMikroOrmAdapter.paginateFind(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryTestToFindQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToFindQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToFindOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call modelsDbToPaginationModelConverterAsync.convert()', () => {
        expect(modelsDbToPaginationModelConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(modelsDbToPaginationModelConverterAsyncMock.convert).toHaveBeenCalledWith(modelTestFixtures, {
          query: queryTestFixture,
          totalItems: totalItemsFixture,
        });
      });

      it('should return Pagination<ModelTest>', () => {
        expect(result).toStrictEqual(paginationModelTestFixture);
      });
    });
  });
});
