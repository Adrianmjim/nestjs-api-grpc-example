import { AppController } from './AppController';

describe(AppController.name, () => {
  let appController: AppController;

  beforeAll(() => {
    appController = new AppController();
  });

  describe('.status()', () => {
    describe('when called', () => {
      let appFixture: { status: 'ok' };
      let result: unknown;

      beforeAll(() => {
        appFixture = { status: 'ok' };
        result = appController.status();
      });

      it('should return ok', () => {
        expect(result).toStrictEqual(appFixture);
      });
    });
  });
});
