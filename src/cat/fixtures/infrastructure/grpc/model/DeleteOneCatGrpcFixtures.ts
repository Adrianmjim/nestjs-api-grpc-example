import { DeleteOneCatGrpc } from '../../../../infrastructure/grpc/model/DeleteOneCatGrpc';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class DeleteOneCatGrpcFixtures {
  public static get any(): DeleteOneCatGrpc {
    const deleteOneCatGrpc: DeleteOneCatGrpc = new DeleteOneCatGrpc();

    deleteOneCatGrpc.id = CatFixtures.any.id;

    return deleteOneCatGrpc;
  }
}
