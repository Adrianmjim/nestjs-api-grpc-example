import { isPostgreSqlError } from './isPostgreSqlError';
import { PostgreSqlError } from '../model/PostgreSqlError';
import { PostgreSqlErrorType } from '../model/PostgreSqlErrorType';

export function isPostgreSqlErrorWithErrorType<TErrorTypes extends PostgreSqlErrorType[]>(
  value: unknown,
  errorTypes: TErrorTypes,
): value is PostgreSqlError & { type: TErrorTypes[number] } {
  const isWithErrorType: boolean = isPostgreSqlError(value) && errorTypes.includes(value.code);

  return isWithErrorType;
}
