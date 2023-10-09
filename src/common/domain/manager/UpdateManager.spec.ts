import { UpdateManager } from './UpdateManager';
import { UpdateAdapter } from '../adapter/UpdateAdapter';

interface CommandTest {
  foo: any;
}

describe(UpdateManager.name, () => {
  let updateAdapterMock: jest.Mocked<UpdateAdapter<CommandTest>>;
  let updateManager: UpdateManager<CommandTest>;

  beforeAll(() => {
    updateAdapterMock = {
      update: jest.fn(),
    };

    updateManager = new UpdateManager(updateAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await updateManager.manage(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateAdapter.update()', () => {
        expect(updateAdapterMock.update).toHaveBeenCalledTimes(1);
        expect(updateAdapterMock.update).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
