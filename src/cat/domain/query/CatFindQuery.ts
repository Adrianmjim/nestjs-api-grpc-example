import { BaseEntityFindQuery } from '../../../common/domain/query/BaseEntityFindQuery';
import { CatSortKeyAndOrderType } from '../model/CatSortKeyAndOrderType';

export class CatFindQuery implements BaseEntityFindQuery {
  public readonly ids: string[] | undefined = undefined;
  public readonly sortKeyAndOrderTypes: CatSortKeyAndOrderType[] | undefined = undefined;

  public constructor(args: Partial<CatFindQuery>) {
    Object.assign(this, args);
  }
}
