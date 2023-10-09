import { InsertOneCommandHandler } from './InsertOneCommandHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertOneCommandHandler.name, () => {
  let insertOneManagerMock: jest.Mocked<ManagerAsync<CommandTest, ModelTest>>;
  let insertOneCommandHandler: InsertOneCommandHandler<CommandTest, ModelTest>;

  beforeAll(() => {
    insertOneManagerMock = {
      manage: jest.fn(),
    };

    insertOneCommandHandler = new InsertOneCommandHandler<CommandTest, ModelTest>(insertOneManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        insertOneManagerMock.manage.mockResolvedValueOnce(modelTestFixture);

        result = await insertOneCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call insertOneManager.manage()', () => {
        expect(insertOneManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(insertOneManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
