import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntitySetCommand } from '../../../domain/command/BaseEntitySetCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntitySetCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  TInput extends BaseEntitySetCommand,
  TOutput extends EntityData<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm> =
      await this.convertToBaseEntitySetQueryMikroOrm(input);

    const output: TOutput = await this.convertToSpecificEntitySetQueryMikroOrm(input, baseEntitySetQueryMikroOrm);

    return output;
  }

  private async convertToBaseEntitySetQueryMikroOrm(_input: TInput): Promise<EntityData<BaseEntityMikroOrm>> {
    const output: EntityData<BaseEntityMikroOrm> = {};

    return output;
  }

  protected abstract convertToSpecificEntitySetQueryMikroOrm(
    input: TInput,
    baseEntitySetQueryMikroOrm: EntityData<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
