import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, map, mergeMap, toArray } from 'rxjs';

import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatUpdateCommand } from '../../../domain/command/CatUpdateCommand';
import { CatUpdateOneCommand } from '../../../domain/command/CatUpdateOneCommand';
import { CatFindQuery } from '../../../domain/query/CatFindQuery';
import { UpdateOneCatGrpc } from '../model/UpdateOneCatGrpc';

@Controller()
export class UpdateCatGrpcController {
  public constructor(private readonly commandBud: CommandBus) {}

  @GrpcMethod('CatService', 'Update')
  public updateOne(messages: Observable<UpdateOneCatGrpc>): Observable<void> {
    return messages.pipe(
      map(
        (updateOneCatGrpc: UpdateOneCatGrpc) =>
          new CatUpdateOneCommand(
            new CatFindQuery({ ids: [updateOneCatGrpc.id] }),
            new CatSetCommand({
              bornDate: updateOneCatGrpc.bornDate,
              color: updateOneCatGrpc.color,
              name: updateOneCatGrpc.name,
            }),
          ),
      ),
      toArray(),
      map((catUpdateOneCommands: CatUpdateOneCommand[]) => new CatUpdateCommand(catUpdateOneCommands)),
      mergeMap(async (catUpdateCommand: CatUpdateCommand) => this.commandBud.execute(catUpdateCommand)),
    );
  }
}
