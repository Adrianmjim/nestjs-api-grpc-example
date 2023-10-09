import { BaseEntity } from '../../../common/domain/model/BaseEntity';

export interface Cat extends BaseEntity {
  bornDate: Date;
  color: string;
  name: string;
}
