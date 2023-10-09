import { AnyEntityMikroOrmToPaginationEntityConverterAsync } from './AnyEntityMikroOrmToPaginationEntityConverterAsync';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { AnyEntity } from '../../../domain/model/AnyEntity';
import { Pagination } from '../../../domain/model/Pagination';
import { AnyEntityPaginateFindQuery } from '../../../domain/query/AnyEntityPaginateFindQuery';
import { AnyEntityFixtures } from '../../../fixtures/domain/model/AnyEntityFixtures';
import { AnyEntityPaginateFindQueryFixtures } from '../../../fixtures/domain/query/AnyEntityPaginateFindQueryFixtures';
import { AnyEntityMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/model/AnyEntityMikroOrmFixtures';
import { AnyEntityMikroOrm } from '../model/AnyEntityMikroOrm';

describe(AnyEntityMikroOrmToPaginationEntityConverterAsync.name, () => {
  let modelDbToModelConverterAsyncMock: jest.Mocked<ConverterAsync<AnyEntityMikroOrm, AnyEntity>>;
  let anyEntityMikroOrmToPaginationEntityConverterAsync: AnyEntityMikroOrmToPaginationEntityConverterAsync<
    AnyEntityMikroOrm[],
    Pagination<AnyEntity>
  >;

  beforeAll(() => {
    modelDbToModelConverterAsyncMock = {
      convert: jest.fn(),
    };

    anyEntityMikroOrmToPaginationEntityConverterAsync = new AnyEntityMikroOrmToPaginationEntityConverterAsync(
      modelDbToModelConverterAsyncMock,
    );
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let anyEntityMikroOrmFixtures: AnyEntityMikroOrm[];
      let paginationContext: { query: AnyEntityPaginateFindQuery; totalItems: number };
      let anyEntityFixture: AnyEntity;
      let anyEntityFixtures: AnyEntity[];
      let paginationAnyEntityFixture: Pagination<AnyEntity>;
      let result: unknown;

      beforeAll(async () => {
        anyEntityMikroOrmFixtures = [AnyEntityMikroOrmFixtures.any];
        paginationContext = {
          query: AnyEntityPaginateFindQueryFixtures.any,
          totalItems: anyEntityMikroOrmFixtures.length,
        };
        anyEntityFixture = AnyEntityFixtures.any;
        anyEntityFixtures = [anyEntityFixture];
        paginationAnyEntityFixture = {
          items: anyEntityFixtures,
          meta: {
            currentPage: paginationContext.query.paginationOptions.page,
            itemCount: anyEntityMikroOrmFixtures.length,
            itemsPerPage: paginationContext.query.paginationOptions.limit,
            totalItems: paginationContext.totalItems,
            totalPages: Math.ceil(paginationContext.totalItems / paginationContext.query.paginationOptions.limit),
          },
        };

        modelDbToModelConverterAsyncMock.convert.mockResolvedValueOnce(anyEntityFixture);

        result = await anyEntityMikroOrmToPaginationEntityConverterAsync.convert(
          anyEntityMikroOrmFixtures,
          paginationContext,
        );
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call modelDbToModelConverterAsyncMock.convert()', () => {
        expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenCalledTimes(anyEntityMikroOrmFixtures.length);

        for (let nthCall: number = 1; nthCall <= anyEntityMikroOrmFixtures.length; nthCall++) {
          expect(modelDbToModelConverterAsyncMock.convert).toHaveBeenNthCalledWith(
            nthCall,
            anyEntityMikroOrmFixtures[nthCall - 1],
          );
        }
      });

      it('should return Pagination<AnyEntity>', () => {
        expect(result).toStrictEqual(paginationAnyEntityFixture);
      });
    });
  });
});
