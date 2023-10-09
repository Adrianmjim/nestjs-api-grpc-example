import { EntityData } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { BaseEntityUpdateCommand } from '../../../domain/command/BaseEntityUpdateCommand';
import { BaseEntityUpdateOneCommand } from '../../../domain/command/BaseEntityUpdateOneCommand';
import { ConverterAsync } from '../../../domain/converter/ConverterAsync';
import { BaseEntityMikroOrm } from '../model/BaseEntityMikroOrm';

@Injectable()
export class BaseEntityUpdateCommandToBaseEntitySetQueryMikroOrmConverterAsync<
  TInput extends BaseEntityUpdateCommand,
  TOutput extends EntityData<BaseEntityMikroOrm>[],
> implements ConverterAsync<TInput, TOutput>
{
  public constructor(
    private readonly baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync: ConverterAsync<
      BaseEntityUpdateOneCommand,
      EntityData<BaseEntityMikroOrm>
    >,
  ) {}

  public async convert(input: TInput): Promise<TOutput> {
    const output: EntityData<BaseEntityMikroOrm>[] = await Promise.all(
      input.commands.map(async (command: BaseEntityUpdateOneCommand) =>
        this.baseEntityUpdateOneCommandToBaseEntitySetQueryMikroOrmConverterAsync.convert(command),
      ),
    );

    return output as TOutput;
  }
}
