import { IsDate, IsNotEmpty } from 'class-validator';

export class InsertOneCatGrpc {
  @IsNotEmpty()
  @IsDate()
  bornDate!: Date;

  @IsNotEmpty()
  color!: string;

  @IsNotEmpty()
  name!: string;
}
