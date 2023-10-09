import { PostgreSqlErrorType } from './PostgreSqlErrorType';

export interface PostgreSqlError {
  code: PostgreSqlErrorType;
}
