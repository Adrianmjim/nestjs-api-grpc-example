import { EntityRepository, FindOneOptions, ObjectQuery } from '@mikro-orm/core';

import { FindOneMikroOrmAdapter } from './FindOneMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindOneMikroOrmAdapter.name, () => {
  let entityRepositoryMock: jest.Mocked<EntityRepository<ModelTest>>;
  let queryTestToFindOneQueryMikroOrmConverterAsyncMock: jest.Mocked<ConverterAsync<QueryTest, ObjectQuery<ModelTest>>>;
  let queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<QueryTest, FindOneOptions<ModelTest>>
  >;
  let modelDbToModelConverterAsyncMock: jest.Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let findOneMikroOrmAdapter: FindOneMikroOrmAdapter<QueryTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityRepositoryMock = {
      findOne: jest.fn(),
    } as Partial<jest.Mocked<EntityRepository<ModelTest>>> as jest.Mocked<EntityRepository<ModelTest>>;

    queryTestToFindOneQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: jest.fn(),
    };

    findOneMikroOrmAdapter = new FindOneMikroOrmAdapter<QueryTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      queryTestToFindOneQueryMikroOrmConverterAsyncMock,
      queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.findOne()', () => {
    describe('when called and entityRepository.findOne() returns null', () => {
      let queryTestFixture: QueryTest;
      let findOneQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOneOptionsQueryMikroOrmTestFixture: FindOneOptions<ModelTest>;
      let modelTestFixture: ModelTest | null;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findOneQueryMikroOrmTestFixture = {};
        findOneOptionsQueryMikroOrmTestFixture = {};
        modelTestFixture = null;

        queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneQueryMikroOrmTestFixture,
        );
        queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneOptionsQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneMikroOrmAdapter.findOne(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryTestToFindOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOneOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });

    describe('when called and entityRepository.findOne() returns ModelTest', () => {
      let queryTestFixture: QueryTest;
      let findOneQueryMikroOrmTestFixture: ObjectQuery<ModelTest>;
      let findOneOptionsQueryMikroOrmTestFixture: FindOneOptions<ModelTest>;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        findOneQueryMikroOrmTestFixture = {};
        findOneOptionsQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };

        queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneQueryMikroOrmTestFixture,
        );
        queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          findOneOptionsQueryMikroOrmTestFixture,
        );
        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixture);
        entityRepositoryMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneMikroOrmAdapter.findOne(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryTestToFindOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToFindOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call queryTestToFindOneOptionsQueryMikroOrmConverterAsync.convert()', () => {
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(queryTestToFindOneOptionsQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should call modelDbToModelConverterAsync.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should return ModelTest', () => {
        expect(result).toStrictEqual(modelTestFixture);
      });
    });
  });
});
