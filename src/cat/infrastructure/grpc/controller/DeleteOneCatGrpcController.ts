import { status } from '@grpc/grpc-js';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

import { CatDeleteCommand } from '../../../domain/command/CatDeleteCommand';
import { Cat } from '../../../domain/model/Cat';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { DeleteOneCatGrpc } from '../model/DeleteOneCatGrpc';

@Controller()
export class DeleteOneCatGrpcController {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UsePipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }),
  )
  @GrpcMethod('CatService', 'DeleteOne')
  public async deleteOne(data: DeleteOneCatGrpc): Promise<void> {
    const catFindOneQuery: CatFindOneQuery = new CatFindOneQuery({ ids: [data.id] });

    const cat: Cat | undefined = await this.queryBus.execute(catFindOneQuery);

    if (cat === undefined) {
      throw new RpcException({ code: status.NOT_FOUND });
    }

    const catDeleteCommand: CatDeleteCommand = new CatDeleteCommand({ id: data.id });

    await this.commandBus.execute(catDeleteCommand);
  }
}
