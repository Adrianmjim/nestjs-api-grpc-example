import { getMinutesFromMs } from './getMinutesFromMs';

describe(getMinutesFromMs.name, () => {
  describe('having a number containing milliseconds', () => {
    let milliseconds: number;

    beforeAll(() => {
      milliseconds = 1000 * 60;
    });

    describe('when called', () => {
      let result: number;

      beforeAll(() => {
        result = getMinutesFromMs(milliseconds);
      });

      it('should return correct amount of minutes', () => {
        expect(result).toBe(1);
      });
    });
  });
});
