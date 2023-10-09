import { PostgreSqlError } from '../model/PostgreSqlError';
import { PostgreSqlErrorType } from '../model/PostgreSqlErrorType';

export function isPostgreSqlError(value: unknown): value is PostgreSqlError {
  const PostgreSqlErrorTypeValues: (PostgreSqlErrorType | string)[] = Object.values(PostgreSqlErrorType);
  const isPostgreSqlError: boolean =
    value !== undefined && value !== null && PostgreSqlErrorTypeValues.includes((value as PostgreSqlError).code);

  return isPostgreSqlError;
}
