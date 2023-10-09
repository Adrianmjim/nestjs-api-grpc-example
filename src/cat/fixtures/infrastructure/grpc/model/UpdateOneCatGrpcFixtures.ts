import { UpdateOneCatGrpc } from '../../../../infrastructure/grpc/model/UpdateOneCatGrpc';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class UpdateOneCatGrpcFixtures {
  public static get any(): UpdateOneCatGrpc {
    const updateOneCatGrpc: UpdateOneCatGrpc = new UpdateOneCatGrpc();

    updateOneCatGrpc.id = CatFixtures.any.id;

    return updateOneCatGrpc;
  }
}
