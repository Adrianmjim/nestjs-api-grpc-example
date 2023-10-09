jest.mock('./isPostgreSqlError');

import { isPostgreSqlError } from './isPostgreSqlError';
import { isPostgreSqlErrorWithErrorType } from './isPostgreSqlErrorWithErrorType';
import { PostgreSqlErrorFixtures } from '../../../fixtures/infrastructure/postgresql/model/PostgreSqlErrorFixtures';
import { PostgreSqlError } from '../model/PostgreSqlError';
import { PostgreSqlErrorType } from '../model/PostgreSqlErrorType';

describe(isPostgreSqlErrorWithErrorType.name, () => {
  describe('when called and isPostgreSqlError() returns false', () => {
    let valueFixture: undefined;
    let result: unknown;

    beforeAll(() => {
      valueFixture = undefined;
      (isPostgreSqlError as unknown as jest.Mock<boolean>).mockReturnValueOnce(false);

      result = isPostgreSqlErrorWithErrorType(valueFixture, [PostgreSqlErrorFixtures.any.code]);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return false', () => {
      expect(result).toBe(false);
    });
  });

  describe('having a value PostgreSqlError and errorTypes including value.code', () => {
    let valueFixture: PostgreSqlError;
    let errorTypesFixture: PostgreSqlErrorType[];

    beforeAll(() => {
      valueFixture = PostgreSqlErrorFixtures.any;
      errorTypesFixture = [PostgreSqlErrorFixtures.any.code];
    });

    describe('when called and isPostgreSqlError() returns true', () => {
      let result: unknown;

      beforeAll(() => {
        (isPostgreSqlError as unknown as jest.Mock<boolean>).mockReturnValueOnce(true);

        result = isPostgreSqlErrorWithErrorType(valueFixture, errorTypesFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return true', () => {
        expect(result).toBe(true);
      });
    });
  });

  describe('having a value PostgreSqlError and errorTypes not including value.code', () => {
    let valueFixture: PostgreSqlError;
    let errorTypesFixture: PostgreSqlErrorType[];

    beforeAll(() => {
      valueFixture = PostgreSqlErrorFixtures.any;
      errorTypesFixture = [];
    });

    describe('when called and isPostgreSqlError() returns true', () => {
      let result: unknown;

      beforeAll(() => {
        (isPostgreSqlError as unknown as jest.Mock<boolean>).mockReturnValueOnce(true);

        result = isPostgreSqlErrorWithErrorType(valueFixture, errorTypesFixture);
      });

      afterAll(() => {
        jest.clearAllMocks();
      });

      it('should return false', () => {
        expect(result).toBe(false);
      });
    });
  });
});
