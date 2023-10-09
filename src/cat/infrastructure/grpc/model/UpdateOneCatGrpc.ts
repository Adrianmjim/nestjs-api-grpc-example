import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateOneCatGrpc {
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsDate()
  bornDate?: Date;

  @IsOptional()
  color?: string;

  @IsOptional()
  name?: string;
}
