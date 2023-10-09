import { EntityRepository, FindOneOptions, ObjectQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { FindOneMikroOrmAdapter } from '../../../../common/infrastructure/mikroOrm/adapter/FindOneMikroOrmAdapter';
import { Cat } from '../../../domain/model/Cat';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync } from '../converter/CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync';
import { CatFindQueryToCatFindQueryMikroOrmConverterAsync } from '../converter/CatFindQueryToCatFindQueryMikroOrmConverterAsync';
import { CatMikroOrmToCatConverterAsync } from '../converter/CatMikroOrmToCatConverterAsync';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class FindOneCatMikroOrmAdapter extends FindOneMikroOrmAdapter<CatFindOneQuery, CatMikroOrm, Cat> {
  public constructor(
    @InjectRepository(CatMikroOrm) catMikroOrmRepository: EntityRepository<CatMikroOrm>,
    @Inject(CatFindQueryToCatFindQueryMikroOrmConverterAsync)
    catFindQueryToCatFindQueryMikroOrmConverterAsync: ConverterAsync<CatFindOneQuery, ObjectQuery<CatMikroOrm>>,
    @Inject(CatFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync)
    catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync: ConverterAsync<
      CatFindOneQuery,
      FindOneOptions<CatMikroOrm>
    >,
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(
      catMikroOrmRepository,
      catFindQueryToCatFindQueryMikroOrmConverterAsync,
      catFindOneQueryToCatFindOneOptionsQueryMikroOrmConverterAsync,
      catMikroOrmToCatConverterAsync,
    );
  }
}
