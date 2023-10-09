import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginateFindGrpc {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(200)
  limit: number = 10;

  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;
}
