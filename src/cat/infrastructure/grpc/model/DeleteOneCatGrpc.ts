import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteOneCatGrpc {
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
