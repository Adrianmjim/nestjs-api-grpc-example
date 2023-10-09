import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, map, mergeMap } from 'rxjs';

import { CatInsertOneCommand } from '../../../domain/command/CatInsertOneCommand';
import { Cat } from '../../../domain/model/Cat';
import { InsertOneCatGrpc } from '../model/InsertOneCatGrpc';

@Controller()
export class InsertOneStreamCatGrpcController {
  public constructor(private readonly commandBus: CommandBus) {}

  @GrpcStreamMethod('CatService', 'InsertOneStream')
  public insertOneStream(messages: Observable<InsertOneCatGrpc>): Observable<Cat> {
    return messages.pipe(
      map(
        (insertOneCatGrpc: InsertOneCatGrpc) =>
          new CatInsertOneCommand({
            bornDate: insertOneCatGrpc.bornDate,
            color: insertOneCatGrpc.color,
            name: insertOneCatGrpc.name,
          }),
      ),
      mergeMap(async (catInsertOneCommand: CatInsertOneCommand) => this.commandBus.execute(catInsertOneCommand)),
    );
  }
}
