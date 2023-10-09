import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneCatGrpc {
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
