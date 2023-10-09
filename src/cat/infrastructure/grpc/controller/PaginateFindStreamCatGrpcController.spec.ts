import { QueryBus } from '@nestjs/cqrs';
import { firstValueFrom, from } from 'rxjs';

import { PaginateFindStreamCatGrpcController } from './PaginateFindStreamCatGrpcController';
import { Pagination } from '../../../../common/domain/model/Pagination';
import { Cat } from '../../../domain/model/Cat';
import { CatPaginateFindQuery } from '../../../domain/query/CatPaginateFindQuery';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { CatPaginateFindQueryFixtures } from '../../../fixtures/domain/query/CatPaginateFindQueryFixtures';
import { PaginateFindCatGrpcFixtures } from '../../../fixtures/infrastructure/grpc/model/PaginateFindCatGrpcFixtures';
import { PaginateFindCatGrpc } from '../model/PaginateFindCatGrpc';

describe(PaginateFindStreamCatGrpcController.name, () => {
  let paginateFindStreamCatGrpcController: PaginateFindStreamCatGrpcController;
  let queryBusMock: jest.Mocked<QueryBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    paginateFindStreamCatGrpcController = new PaginateFindStreamCatGrpcController(queryBusMock);
  });

  describe('.paginateFind()', () => {
    describe('when called', () => {
      let paginateFindCatGrpcFixture: PaginateFindCatGrpc;
      let catPaginateFindQueryFixture: CatPaginateFindQuery;
      let paginationCatFixture: Pagination<Cat>;
      let result: unknown;

      beforeAll(async () => {
        paginateFindCatGrpcFixture = PaginateFindCatGrpcFixtures.any;
        catPaginateFindQueryFixture = CatPaginateFindQueryFixtures.any;
        paginationCatFixture = {
          items: [CatFixtures.any],
          meta: {
            currentPage: 1,
            itemCount: 1,
            itemsPerPage: 1,
            totalItems: 1,
            totalPages: 1,
          },
        };

        queryBusMock.execute.mockResolvedValueOnce(paginationCatFixture);

        result = await firstValueFrom(
          paginateFindStreamCatGrpcController.paginateFindStream(from([paginateFindCatGrpcFixture])),
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catPaginateFindQueryFixture);
      });

      it('should return a Pagination<Cat>', () => {
        expect(result).toBe(paginationCatFixture);
      });
    });
  });
});
