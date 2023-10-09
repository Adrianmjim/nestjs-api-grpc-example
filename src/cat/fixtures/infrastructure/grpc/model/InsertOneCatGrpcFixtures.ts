import { InsertOneCatGrpc } from '../../../../infrastructure/grpc/model/InsertOneCatGrpc';
import { CatFixtures } from '../../../domain/model/CatFixtures';

export class InsertOneCatGrpcFixture {
  public static get any(): InsertOneCatGrpc {
    const insertOneCatGrpc: InsertOneCatGrpc = new InsertOneCatGrpc();

    insertOneCatGrpc.bornDate = CatFixtures.any.bornDate;
    insertOneCatGrpc.color = CatFixtures.any.color;
    insertOneCatGrpc.name = CatFixtures.any.name;

    return insertOneCatGrpc;
  }
}
