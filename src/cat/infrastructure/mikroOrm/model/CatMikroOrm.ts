import { Entity, Property } from '@mikro-orm/core';

import { BaseEntityMikroOrm } from '../../../../common/infrastructure/mikroOrm/model/BaseEntityMikroOrm';

@Entity({ tableName: 'Cat' })
export class CatMikroOrm extends BaseEntityMikroOrm {
  @Property({ length: 3, name: 'born_date', type: 'datetime' })
  bornDate!: Date;

  @Property({ length: 128, name: 'color', type: 'varchar' })
  color!: string;

  @Property({ length: 128, name: 'name', type: 'varchar' })
  name!: string;
}
