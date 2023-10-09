import { status } from '@grpc/grpc-js';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';

import { DeleteOneCatGrpcController } from './DeleteOneCatGrpcController';
import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { CatDeleteCommandFixtures } from '../../../fixtures/domain/command/CatDeleteCommandFixtures';
import { CatFixtures } from '../../../fixtures/domain/model/CatFixtures';
import { CatFindOneQueryFixtures } from '../../../fixtures/domain/query/CatFindOneQueryFixtures';
import { DeleteOneCatGrpcFixtures } from '../../../fixtures/infrastructure/grpc/model/DeleteOneCatGrpcFixtures';
import { DeleteOneCatGrpc } from '../model/DeleteOneCatGrpc';

describe(DeleteOneCatGrpcController.name, () => {
  let deleteOneCatGrpcController: DeleteOneCatGrpcController;
  let queryBusMock: jest.Mocked<QueryBus>;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    queryBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<QueryBus>> as jest.Mocked<QueryBus>;

    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    deleteOneCatGrpcController = new DeleteOneCatGrpcController(commandBusMock, queryBusMock);
  });

  describe('.deleteOne()', () => {
    describe('when called and cat is undefined', () => {
      let deleteOneCatGrpcFixture: DeleteOneCatGrpc;
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFixture: Cat | undefined;
      let result: unknown;

      beforeAll(async () => {
        deleteOneCatGrpcFixture = DeleteOneCatGrpcFixtures.any;
        catFindOneQueryFixture = CatFindOneQueryFixtures.withIds;
        catFixture = undefined;

        queryBusMock.execute.mockResolvedValueOnce(catFixture);

        try {
          result = await deleteOneCatGrpcController.deleteOne(deleteOneCatGrpcFixture);
        } catch (err: unknown) {
          result = err;
        }
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindOneQueryFixture);
      });

      it('should throw a RpcException', () => {
        expect(result).toBeInstanceOf(RpcException);
        expect(((result as RpcException).getError() as { code: string }).code).toBe(status.NOT_FOUND);
      });
    });

    describe('when called', () => {
      let deleteOneCatGrpcFixture: DeleteOneCatGrpc;
      let catFindOneQueryFixture: CatFindOneQuery;
      let catFixture: Cat | undefined;
      let catDeleteCommandFixture: CatDeleteCommand;

      beforeAll(async () => {
        deleteOneCatGrpcFixture = DeleteOneCatGrpcFixtures.any;
        catFindOneQueryFixture = CatFindOneQueryFixtures.withIds;
        catFixture = CatFixtures.any;
        catDeleteCommandFixture = CatDeleteCommandFixtures.withId;

        queryBusMock.execute.mockResolvedValueOnce(catFixture);

        await deleteOneCatGrpcController.deleteOne(deleteOneCatGrpcFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call queryBus.execute()', () => {
        expect(queryBusMock.execute).toHaveBeenCalledTimes(1);
        expect(queryBusMock.execute).toHaveBeenCalledWith(catFindOneQueryFixture);
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catDeleteCommandFixture);
      });
    });
  });
});
