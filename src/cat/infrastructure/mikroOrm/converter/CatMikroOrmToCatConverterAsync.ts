import { Injectable } from '@nestjs/common';

import { BaseEntity } from '../../../../common/domain/model/BaseEntity';
import { BaseEntityMikroOrmToBaseEntityConverterAsync } from '../../../../common/infrastructure/mikroOrm/converter/BaseEntityMikroOrmToBaseEntityConverterAsync';
import { Cat } from '../../../domain/model/Cat';
import { CatMikroOrm } from '../model/CatMikroOrm';

@Injectable()
export class CatMikroOrmToCatConverterAsync extends BaseEntityMikroOrmToBaseEntityConverterAsync<CatMikroOrm, Cat> {
  protected async convertToSpecificEntity(input: CatMikroOrm, baseEntity: BaseEntity): Promise<Cat> {
    const Cat: Cat = {
      ...baseEntity,
      bornDate: input.bornDate,
      color: input.color,
      name: input.name,
    };

    return Cat;
  }
}
