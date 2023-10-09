import { FindManager } from './FindManager';
import { FindAdapter } from '../adapter/FindAdapter';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindManager.name, () => {
  let findAdapterMock: jest.Mocked<FindAdapter<QueryTest, ModelTest>>;
  let findManager: FindManager<QueryTest, ModelTest>;

  beforeAll(() => {
    findAdapterMock = {
      find: jest.fn(),
    };

    findManager = new FindManager(findAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelTestFixtures: ModelTest[];
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        modelTestFixtures = [
          {
            foo: 'foo',
          },
        ];

        findAdapterMock.find.mockResolvedValueOnce(modelTestFixtures);

        result = await findManager.manage(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findAdapter.find()', () => {
        expect(findAdapterMock.find).toHaveBeenCalledTimes(1);
        expect(findAdapterMock.find).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return ModelTest[]', () => {
        expect(result).toBe(modelTestFixtures);
      });
    });
  });
});
