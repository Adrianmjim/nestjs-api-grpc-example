import { PostgreSqlError } from '../../../../infrastructure/postgresql/model/PostgreSqlError';
import { PostgreSqlErrorType } from '../../../../infrastructure/postgresql/model/PostgreSqlErrorType';

export class PostgreSqlErrorFixtures {
  public static get any(): PostgreSqlError {
    const postgreSqlError: PostgreSqlError = {
      code: PostgreSqlErrorType.UNIQUE_VIOLATION,
    };

    return postgreSqlError;
  }

  public static get withCodeForeignKeyViolation(): PostgreSqlError {
    const postgreSqlError: PostgreSqlError = {
      code: PostgreSqlErrorType.FOREIGN_KEY_VIOLATION,
    };

    return postgreSqlError;
  }

  public static get withCodeUniqueViolation(): PostgreSqlError {
    const postgreSqlError: PostgreSqlError = {
      code: PostgreSqlErrorType.UNIQUE_VIOLATION,
    };

    return postgreSqlError;
  }
}
