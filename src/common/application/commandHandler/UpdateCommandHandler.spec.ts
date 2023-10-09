import { UpdateCommandHandler } from './UpdateCommandHandler';
import { ManagerAsync } from '../../domain/manager/ManagerAsync';

interface CommandTest {
  foo: any;
}

describe(UpdateCommandHandler.name, () => {
  let updateManagerMock: jest.Mocked<ManagerAsync<CommandTest, void>>;
  let updateCommandHandler: UpdateCommandHandler<CommandTest>;

  beforeAll(() => {
    updateManagerMock = {
      manage: jest.fn(),
    };

    updateCommandHandler = new UpdateCommandHandler<CommandTest>(updateManagerMock);
  });

  describe('.execute()', () => {
    describe('when called', () => {
      let commandTestFixture: CommandTest;

      beforeAll(async () => {
        commandTestFixture = {
          foo: 'foo',
        };

        await updateCommandHandler.execute(commandTestFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should call updateManager.manage()', () => {
        expect(updateManagerMock.manage).toHaveBeenCalledTimes(1);
        expect(updateManagerMock.manage).toHaveBeenCalledWith(commandTestFixture);
      });
    });
  });
});
