import { PaginateFindCatGrpc } from '../../../../infrastructure/grpc/model/PaginateFindCatGrpc';

export class PaginateFindCatGrpcFixtures {
  public static get any(): PaginateFindCatGrpc {
    const paginateFindCatGrpc: PaginateFindCatGrpc = new PaginateFindCatGrpc();

    return paginateFindCatGrpc;
  }
}
