import { CommandBus } from '@nestjs/cqrs';
import { firstValueFrom, from } from 'rxjs';

import { UpdateCatGrpcController } from './UpdateCatGrpcController';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateCommandFixtures } from '../../../fixtures/domain/command/CatUpdateCommandFixtures';
import { UpdateOneCatGrpcFixtures } from '../../../fixtures/infrastructure/grpc/model/UpdateOneCatGrpcFixtures';
import { UpdateOneCatGrpc } from '../model/UpdateOneCatGrpc';

describe(UpdateCatGrpcController.name, () => {
  let updateCatGrpcController: UpdateCatGrpcController;
  let commandBusMock: jest.Mocked<CommandBus>;

  beforeAll(() => {
    commandBusMock = {
      execute: jest.fn(),
    } as Partial<jest.Mocked<CommandBus>> as jest.Mocked<CommandBus>;

    updateCatGrpcController = new UpdateCatGrpcController(commandBusMock);
  });

  describe('.deleteOne()', () => {
    describe('when called', () => {
      let updateOneCatGrpcFixture: UpdateOneCatGrpc;
      let catUpdateCommandFixture: CatUpdateCommand;

      beforeAll(async () => {
        updateOneCatGrpcFixture = UpdateOneCatGrpcFixtures.any;
        catUpdateCommandFixture = CatUpdateCommandFixtures.any;

        await firstValueFrom(updateCatGrpcController.updateOne(from([updateOneCatGrpcFixture])));
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call commandBus.execute()', () => {
        expect(commandBusMock.execute).toHaveBeenCalledTimes(1);
        expect(commandBusMock.execute).toHaveBeenCalledWith(catUpdateCommandFixture);
      });
    });
  });
});
