import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync';
import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatFindQueryToCatFindQueryMikroOrmConverterAsync extends BaseEntityFindQueryToBaseEntityFindQueryMikroOrmConverterAsync<
  CatFindQuery,
  ObjectQuery<CatMikroOrm>
> {
  protected async convertToSpecificEntityFindQueryMikroOrm(
    _input: CatFindQuery,
    baseEntityFindQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<ObjectQuery<CatMikroOrm>> {
    const catFindQueryMikroOrm: ObjectQuery<CatMikroOrm> = {
      ...(baseEntityFindQueryMikroOrm as ObjectQuery<CatMikroOrm>),
    };

    return catFindQueryMikroOrm;
  }
}
