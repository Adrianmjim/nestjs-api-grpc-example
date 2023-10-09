import { DateFixtures } from '../../../../common/fixtures/domain/model/DateFixtures';
import { Cat } from '../../../domain/model/Cat';

export class CatFixtures {
  public static get any(): Cat {
    const cat: Cat = {
      bornDate: DateFixtures.any,
      color: 'color-example',
      createdAt: DateFixtures.createdAt,
      id: 'cat-id-example',
      name: 'name-example',
      updatedAt: undefined,
      version: 0,
    };

    return cat;
  }
}
