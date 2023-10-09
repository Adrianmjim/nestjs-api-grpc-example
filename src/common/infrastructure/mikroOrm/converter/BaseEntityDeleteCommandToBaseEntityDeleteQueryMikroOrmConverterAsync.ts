import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityDeleteCommand } from '../../../domain/command/BaseEntityDeleteCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export abstract class BaseEntityDeleteCommandToBaseEntityDeleteQueryMikroOrmConverterAsync<
  TInput extends BaseEntityDeleteCommand,
  TOutput extends ObjectQuery<BaseEntityMikroOrm>,
> implements ConverterAsync<TInput, TOutput>
{
  public async convert(input: TInput): Promise<TOutput> {
    const baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> =
      await this.convertToBaseEntityDeleteQueryMikroOrm(input);

    const output: TOutput = await this.convertToSpecificEntityDeleteQueryMikroOrm(input, baseEntityDeleteQueryMikroOrm);

    return output;
  }

  private async convertToBaseEntityDeleteQueryMikroOrm(input: TInput): Promise<ObjectQuery<BaseEntityMikroOrm>> {
    const baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm> = {};

    if (input.id !== undefined) {
      baseEntityDeleteQueryMikroOrm.id = input.id;
    }

    return baseEntityDeleteQueryMikroOrm;
  }

  protected abstract convertToSpecificEntityDeleteQueryMikroOrm(
    input: TInput,
    baseEntityDeleteQueryMikroOrm: ObjectQuery<BaseEntityMikroOrm>,
  ): Promise<TOutput>;
}
