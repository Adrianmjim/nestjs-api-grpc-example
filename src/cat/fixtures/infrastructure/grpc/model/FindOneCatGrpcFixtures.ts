import { FindOneCatGrpc } from '../../../../infrastructure/grpc/model/FindOneCatGrpc';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class FindOneCatGrpcFixtures {
  public static get any(): FindOneCatGrpc {
    const findOneCatGrpc: FindOneCatGrpc = new FindOneCatGrpc();

    findOneCatGrpc.id = CatFixtures.any.id;

    return findOneCatGrpc;
  }
}
