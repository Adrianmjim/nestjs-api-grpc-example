import { Inject, Injectable } from '@nestjs/common';

import { CatMikroOrmToCatConverterAsync } from './CatMikroOrmToCatConverterAsync';
import { ConverterAsync } from '../../../../common/domain/converter/ConverterAsync';
import { Pagination } from '../../../../common/domain/model/Pagination';
import { AnyEntityMikroOrmToPaginationEntityConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/AnyEntityMikroOrmToPaginationEntityConverterAsync';
import { Cat } from '../../../domain/model/Cat';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatMikroOrmToPaginationCatConverterAsync extends AnyEntityMikroOrmToPaginationEntityConverterAsync<
  CatMikroOrm[],
  Pagination<Cat>
> {
  public constructor(
    @Inject(CatMikroOrmToCatConverterAsync)
    catMikroOrmToCatConverterAsync: ConverterAsync<CatMikroOrm, Cat>,
  ) {
    super(catMikroOrmToCatConverterAsync);
  }
}
