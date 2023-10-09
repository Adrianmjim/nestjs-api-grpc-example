import { PaginateFindQueryHandler } from './PaginateFindQueryHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';
import { Pagination } from '../../domain/model/Pagination';

interface QueryTest {
  foo: any;
}

interface ModelTest {
  foo: any;
}

describe(PaginateFindQueryHandler.name, () => {
  let paginateFindManagerMock: jest.Mocked<ManagerAsync<QueryTest, Pagination<ModelTest>>>;
  let paginateFindQueryHandler: PaginateFindQueryHandler<QueryTest, ModelTest>;

  beforeAll(() => {
    paginateFindManagerMock = {
      manage: jest.fn(),
    };

    paginateFindQueryHandler = new PaginateFindQueryHandler(paginateFindManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let queryTestFixture: QueryTest;
      let paginationModelTestFixture: Pagination<ModelTest>;
      let result: unknown;

      beforeAll(async () => {
        paginationModelTestFixture = {
          items: [
            {
              foo: 'foo',
            },
          ],
          meta: {
            currentPage: 0,
            itemCount: 0,
            itemsPerPage: 0,
            totalItems: 0,
            totalPages: 0,
          },
        };
        queryTestFixture = {
          foo: 'foo',
        };

        paginateFindManagerMock.manage.mockResolvedValueOnce(paginationModelTestFixture);

        result = await paginateFindQueryHandler.execute(queryTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call paginateFindManager.manage()', () => {
        expect(paginateFindManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(paginateFindManagerMock.manage).toHaveBeenCalledWith(queryTestFixture);
      });

      it('should return Pagination<ModelTest>', () => {
        expect(result).toBe(paginationModelTestFixture);
      });
    });
  });
});
