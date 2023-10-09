import { PaginationMeta } from './PaginationMeta';

export interface Pagination<TModel> {
  items: TModel[];
  meta: PaginationMeta;
}
