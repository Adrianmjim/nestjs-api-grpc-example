import { RequiredEntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityInsertCommand } from '../../../domain/command/BaseEntityInsertCommand';
import { BaseEntityInsertOneCommand } from '../../../domain/command/BaseEntityInsertOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export class BaseEntityInsertCommandToBaseEntityInsertQueryMikroOrmConverterAsync<
  TInput extends BaseEntityInsertCommand,
  TOutput extends RequiredEntityData<BaseEntityMikroOrm>[],
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync: ConverterAsync<
      BaseEntityInsertOneCommand,
      RequiredEntityData<BaseEntityMikroOrm>
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const result: RequiredEntityData<BaseEntityMikroOrm>[] = await Promise.all(
      input.commands.map(async (command: BaseEntityInsertOneCommand) =>
        this.baseEntityInsertOneCommandToBaseEntityInsertOneQueryMikroOrmConverterAsync.convert(command),
      ),
    );

    return result as TOutput;
  }
}
