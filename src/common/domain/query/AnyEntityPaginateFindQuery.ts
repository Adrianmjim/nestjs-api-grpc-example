import { AnyEntityFindQuery } from './AnyEntityFindQuery';
import { PaginationOptions } from '../model/PaginationOptions';

export interface AnyEntityPaginateFindQuery {
  findQuery: AnyEntityFindQuery;
  paginationOptions: PaginationOptions;
}
