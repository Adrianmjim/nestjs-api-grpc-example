import { FindOneManager } from './FindOneManager';
import { FindOneAdapter } from '../adapter/FindOneAdapter';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(FindOneManager.name, () => {
  let findOneAdapterMock: jest.Mocked<FindOneAdapter<QueryTest, ModelTest>>;
  let findOneManager: FindOneManager<QueryTest, ModelTest>;

  beforeAll(() => {
    findOneAdapterMock = {
      findOne: jest.fn(),
    };

    findOneManager = new FindOneManager(findOneAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let modelTestFixture: ModelTest;
      let result: unknown;

      beforeAll(async () => {
        queryTestFixture = {
          foo: 'foo',
        };
        modelTestFixture = {
          foo: 'foo',
        };

        findOneAdapterMock.findOne.mockResolvedValueOnce(modelTestFixture);

        result = await findOneManager.manage(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call findOneAdapter.findOne()', () => {
        expect(findOneAdapterMock.findOne).toHaveBeenCalledTimes(1);
        expect(findOneAdapterMock.findOne).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return TModel or undefined', () => {
        expect(result).toBe(modelTestFixture);
      });
    });
  });
});
