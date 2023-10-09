import { BaseEntityFindQuery } from './BaseEntityFindQuery';
import { PaginationOptions } from '../model/PaginationOptions';

export interface BaseEntityPaginateFindQuery {
  findQuery: BaseEntityFindQuery;
  paginationOptions: PaginationOptions;
}
