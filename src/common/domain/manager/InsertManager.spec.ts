import { InsertManager } from './InsertManager';
import { InsertAdapter } from '../adapter/InsertAdapter';

interface CommandTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(InsertManager.name, () => {
  let insertAdapterMock: jest.Mocked<InsertAdapter<CommandTest, ModelTest>>;
  let insertManager: InsertManager<CommandTest, ModelTest>;

  beforeAll(() => {
    insertAdapterMock = {
      insert: jest.fn(),
    };

    insertManager = new InsertManager(insertAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];

        insertAdapterMock.insert.mockResolvedValueOnce(modelTestFixtures);

        result = await insertManager.manage(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call insertOneAdapter.insertOne()', () => {
        expect(insertAdapterMock.insert).toHaveBeenCalledTimes(1);
        expect(insertAdapterMock.insert).toHaveBeenCalledWith(commandTestFixture);
      });

      it('should return a ModelTest', () => {
        expect(result).toBe(modelTestFixtures);
      });
    });
  });
});
