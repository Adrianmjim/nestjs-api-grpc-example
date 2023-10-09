import { Injectable } from '@nestjs/common';

import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntity } from '../../../domain/model/BaseEntity';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityMikroOrmToBaseEntityConverterAsync<
  TInput extends BaseEntityMikroOrm,
  TOutput extends BaseEntity,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntity: BaseEntity = this.convertToBaseEntity(input);

    const output: TOutput = await this.convertToSpecificEntity(input, baseEntity);

    return output;
  }

  private convertToBaseEntity(input: TInput): BaseEntity {
    const output: BaseEntity = {
      createdAt: input.createdAt,
      id: input.id,
      updatedAt: input.updatedAt,
      version: input.version,
    };

    return output;
  }

  protected abstract convertToSpecificEntity(input: TInput, baseEntity: BaseEntity): Promise<TOutput>;
}
