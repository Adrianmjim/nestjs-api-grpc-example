import { CatFindQuery } from './CatFindQuery';
import { PaginationOptions } from '../../../common/domain/model/PaginationOptions';
import { BaseEntityPaginateFindQuery } from '../../../common/domain/query/BaseEntityPaginateFindQuery';

export class CatPaginateFindQuery implements BaseEntityPaginateFindQuery {
  public constructor(
    public readonly findQuery: CatFindQuery,
    public readonly paginationOptions: PaginationOptions,
  ) {}
}
