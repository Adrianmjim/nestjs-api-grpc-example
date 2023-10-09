import { isValidHoursMinutesTimeString } from './isValidHoursMinutesTimeString';

describe(isValidHoursMinutesTimeString.name, () => {
  describe('having an hours string with length different than 2', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '0:00';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a minutes string with length different than 2', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '00:0';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having an hours string that is NaN', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = 'aa:00';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a minutes string that is NaN', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '00:bb';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a valid hours and minutes string, but hours is less than 0', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '-1:00';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a valid hours and minutes string and it is 24:00', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '24:00';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(true);
      });
    });
  });

  describe('having a valid hours and minutes string, but hours is greater than 24:00', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '24:01';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a valid hours and minutes string, but minutes is less than 0', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '00:-1';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a valid hours and minutes string, but minutes is greater than 59', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '00:60';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });

  describe('having a valid hours minutes string', () => {
    let hoursMinutesTimeString: string;

    beforeAll(() => {
      hoursMinutesTimeString = '00:00';
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = isValidHoursMinutesTimeString(hoursMinutesTimeString);
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });
});
