import { ObjectQuery } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export class BaseEntityUpdateCommandToBaseEntityFindQueryMikroOrmConverterAsync<
  TInput extends BaseEntityUpdateCommand,
  TOutput extends ObjectQuery<BaseEntityMikroOrm>[],
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync: ConverterAsync<
      BaseEntityUpdateOneCommand,
      ObjectQuery<BaseEntityMikroOrm>
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const output: ObjectQuery<BaseEntityMikroOrm>[] = await Promise.all(
      input.commands.map(async (command: BaseEntityUpdateOneCommand) =>
        this.baseEntityUpdateOneCommandToBaseEntityFindQueryMikroOrmConverterAsync.convert(command),
      ),
    );

    return output as TOutput;
  }
}
