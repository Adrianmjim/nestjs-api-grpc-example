import { UpdateOneManager } from './UpdateOneManager';
import { UpdateOneAdapter } from '../adapter/UpdateOneAdapter';

interface CommandTest {
  foo: any;
}

describe(UpdateOneManager.name, () => {
  let updateOneAdapterMock: jest.Mocked<UpdateOneAdapter<CommandTest>>;
  let updateOneManager: UpdateOneManager<CommandTest>;

  beforeAll(() => {
    updateOneAdapterMock = {
      updateOne: jest.fn(),
    };

    updateOneManager = new UpdateOneManager(updateOneAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await updateOneManager.manage(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateAdapter.updateOne()', () => {
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledTimes(1);
        expect(updateOneAdapterMock.updateOne).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
