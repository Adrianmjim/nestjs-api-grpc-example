jest.mock('../../postgresql/typeguard/isPostgreSqlErrorWithErrorType');

import { EntityManager, EntityRepository, RequiredEntityData } from '@mikro-orm/core';

import { InsertOneMikroOrmAdapter } from './InsertOneMikroOrmAdapter';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { InvalidArgumentException } from '../../../domain/exception/InvalidArgumentException';
import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { PostgreSqlError } from '../../postgresql/model/PostgreSqlError';
import { PostgreSqlErrorType } from '../../postgresql/model/PostgreSqlErrorType';
import { isPostgreSqlErrorWithErrorType } from '../../postgresql/typeguard/isPostgreSqlErrorWithErrorType';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertOneMikroOrmAdapter.name, () => {
  let entityManagerMock: jest.Mocked<EntityManager>;
  let entityRepositoryMock: jest.Mocked<EntityRepository<ModelTest>>;
  let commandTestToInsertOneQueryMikroOrmConverterAsyncMock: jest.Mocked<
    ConverterAsync<CommandTest, RequiredEntityData<ModelTest>>
  >;
  let modelDbToModelConverterAsyncMock: jest.Mocked<ConverterAsync<ModelTest, ModelTest>>;
  let insertOneMikroOrmAdapter: InsertOneMikroOrmAdapter<CommandTest, ModelTest, ModelTest>;

  beforeAll(() => {
    entityManagerMock = {
      persistAndFlush: jest.fn(),
    } as Partial<jest.Mocked<EntityManager>> as jest.Mocked<EntityManager>;
    entityRepositoryMock = {
      create: jest.fn(),
      getEntityManager: jest.fn(() => entityManagerMock),
    } as Partial<jest.Mocked<EntityRepository<ModelTest>>> as jest.Mocked<EntityRepository<ModelTest>>;

    commandTestToInsertOneQueryMikroOrmConverterAsyncMock = {
      convert: jest.fn(),
    };

    modelDbToModelConverterAsyncMock = {
      convert: jest.fn(),
    };

    insertOneMikroOrmAdapter = new InsertOneMikroOrmAdapter<CommandTest, ModelTest, ModelTest>(
      entityRepositoryMock,
      commandTestToInsertOneQueryMikroOrmConverterAsyncMock,
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.insertOne()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(modelTestFixture);

        result = await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandTestToInsertOneQueryMikroOrmConverterAsync.convert()', () => {
        expect(commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledTimes(1);
        expect(commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should call entityRepository.create()', () => {
        expect(entityRepositoryMock.create).toHaveBeenCalledTimes(1);
        expect(entityRepositoryMock.create).toHaveBeenCalledWith(insertOneQueryMikroOrmTestFixture);
      });

      it('should call entityRepository.getEntityManager()', () => {
        expect(entityRepositoryMock.getEntityManager).toHaveBeenCalledTimes(1);
      });

      it('should call entityRepository.getEntityManager().persistAndFlush()', () => {
        expect(entityManagerMock.persistAndFlush).toHaveBeenCalledTimes(1);
        expect(entityManagerMock.persistAndFlush).toHaveBeenCalledWith(modelTestFixture);
      });

      it('should return an ModelTest', () => {
        expect(result).toBe(modelTestFixture);
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error matching PostgreSqlErrorType.FOREIGN_KEY_VIOLATION', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        errorFixture = PostgreSqlErrorFixtures.withCodeForeignKeyViolation;

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>).mockReturnValueOnce(true);

        try {
          await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call isPostgreSqlErrorWithErrorType()', () => {
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledTimes(1);
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledWith(errorFixture, [
          PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
        ]);
      });

      it('should throw an InvalidArgumentException', () => {
        expect(result).toBeInstanceOf(InvalidArgumentException);
        expect((result as InvalidArgumentException).message).toBe('Foreign key violation');
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error matching PostgreSqlErrorType.UNIQUE_VIOLATION', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let errorFixture: PostgreSqlError;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        errorFixture = PostgreSqlErrorFixtures.withCodeUniqueViolation;

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);

        try {
          await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call isPostgreSqlErrorWithErrorType()', () => {
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenCalledTimes(2);
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenNthCalledWith(1, errorFixture, [
          PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
        ]);
        expect(isPostgreSqlErrorWithErrorType).toHaveBeenNthCalledWith(2, errorFixture, [
          PostgreSqlErrorType.UNIQUE_VIOLATION,
        ]);
      });

      it('should throw an InvalidArgumentException', () => {
        expect(result).toBeInstanceOf(InvalidArgumentException);
        expect((result as InvalidArgumentException).message).toBe('Duplicated entity');
      });
    });

    describe('when called and entityRepository.persistAndFlush throws an Error and isPostgreSqlErrorWithErrorType returns false', () => {
      let commandTestFixture: CommandTest;
      let insertOneQueryMikroOrmTestFixture: RequiredEntityData<ModelTest>;
      let modelTestFixture: ModelTest;
      let errorFixture: unknown;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        insertOneQueryMikroOrmTestFixture = {};
        modelTestFixture = {
          foo: 'foo',
        };
        errorFixture = new Error('Error when entityRepository.persistAndFlush is called');

        commandTestToInsertOneQueryMikroOrmConverterAsyncMock.convert.mockResolvedValueOnce(
          insertOneQueryMikroOrmTestFixture,
        );
        entityRepositoryMock.create.mockReturnValueOnce(modelTestFixture);
        entityManagerMock.persistAndFlush.mockRejectedValueOnce(errorFixture);
        (isPostgreSqlErrorWithErrorType as unknown as jest.Mock<boolean>).mockReturnValueOnce(false);

        try {
          await insertOneMikroOrmAdapter.insertOne(commandTestFixture);
        } catch (error: unknown) {
          result = error;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should throw an Error', () => {
        expect(result).toBe(errorFixture);
      });
    });
  });
});
