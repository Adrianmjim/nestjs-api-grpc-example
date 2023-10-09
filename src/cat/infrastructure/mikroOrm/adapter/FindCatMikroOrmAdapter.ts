import { EntityRepository, FindOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { FindMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/FindMikroOrmAdapter';
import { Cat } from '../../../domain/model/Cat';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync } from '../converter/CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync';
import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from '../converter/CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class FindCatMikroOrmAdapter extends FindMikroOrmAdapter<CatFindQuery, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm) catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatFindQueryToCatFindQueryMikroOrmConverterAsync)
    catFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, ObjectQuery<CatMikroOrm>>,
    @Inject(CatFindQueryToCatFindOptionsQueryMikroOrmConverterAsync)
    catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync: ConverterAsync<CatFindQuery, FindOptions<CatMikroOrm>>,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catFindQueryToCatFindQueryMikroOrmConverterAsync,
      catFindQueryToCatFindOptionsQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
