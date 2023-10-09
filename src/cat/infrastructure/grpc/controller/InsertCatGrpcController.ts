import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, map, mergeMap, toArray } from 'rxjs';

import { CatInsertCommand } from '../../../domain/command/CatInsertCommand';
import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { Cat } from '../../../domain/model/Cat';
import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';

@Controller()
export class InsertCatGrpcController {
  public constructor(private readonly commandBus: CommandBus) {}

  @GrpcStreamMethod('CatService', 'Insert')
  public insert(messages: Observable<InsertOneCatGrpc>): Observable<{ items: Cat[] }> {
    return messages.pipe(
      map(
        (insertOneCatGrpc: InsertOneCatGrpc) =>
          new CatInsertOneCommand({
            bornDate: insertOneCatGrpc.bornDate,
            color: insertOneCatGrpc.color,
            name: insertOneCatGrpc.name,
          }),
      ),
      toArray(),
      map((catInsertOneCommands: CatInsertOneCommand[]) => new CatInsertCommand(catInsertOneCommands)),
      mergeMap(async (catInsertCommand: CatInsertCommand) => this.commandBus.execute(catInsertCommand)),
      map((cats: Cat[]) => ({ items: cats })),
    );
  }
}
