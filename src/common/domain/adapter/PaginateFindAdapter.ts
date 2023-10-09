import { Pagination } from '../model/Pagination';

export interface PaginateFindAdapter<TQuery, TModel> {
  paginateFind(query: TQuery): Promise<Pagination<TModel>>;
}
