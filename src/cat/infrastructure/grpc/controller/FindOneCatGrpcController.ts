import { status } from '@grpc/grpc-js';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

import { Cat } from '../../../domain/model/Cat';
import { CatFindOneQuery } from '../../../domain/query/CatFindOneQuery';
import { FindOneCatGrpc } from '../model/FindOneCatGrpc';

@Controller()
export class FindOneCatGrpcController {
  public constructor(private readonly queryBus: QueryBus) {}

  @UsePipes(
    new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true }, whitelist: true }),
  )
  @GrpcMethod('CatService', 'FindOne')
  public async findOne(data: FindOneCatGrpc): Promise<Cat> {
    const catFindOneQuery: CatFindOneQuery = new CatFindOneQuery({ ids: [data.id] });

    const cat: Cat | undefined = await this.queryBus.execute(catFindOneQuery);

    if (cat === undefined) {
      throw new RpcException({ code: status.NOT_FOUND });
    }

    return cat;
  }
}
