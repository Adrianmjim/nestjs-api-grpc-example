import { DeleteManager } from './DeleteManager';
import { DeleteAdapter } from '../adapter/DeleteAdapter';

interface CommandTest {
  foo: any;
}

describe(DeleteManager.name, () => {
  let deleteAdapterMock: jest.Mocked<DeleteAdapter<CommandTest>>;
  let deleteManager: DeleteManager<CommandTest>;

  beforeAll(() => {
    deleteAdapterMock = {
      delete: jest.fn(),
    };

    deleteManager = new DeleteManager(deleteAdapterMock);
  });

  describe('.manage()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = { foo: 'foo' };

        await deleteManager.manage(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call deleteAdapter.delete()', () => {
        expect(deleteAdapterMock.delete).toHaveBeenCalledTimes(1);
        expect(deleteAdapterMock.delete).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
