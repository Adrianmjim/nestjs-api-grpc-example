import { EntityData } from '@mikro-orm/core';

import { CatSetCommandToCatSetQueryMikroOrmConverterAsync } from './CatSetCommandToCatSetQueryMikroOrmConverterAsync';
import { CatSetCommand } from '../../../domain/command/CatSetCommand';
import { CatSetCommandFixtures } from '../../../fixtures/domain/command/CatSetCommandFixtures';
import { CatSetQueryMikroOrmFixtures } from '../../../fixtures/infrastructure/mikroOrm/command/CatSetQueryMikroOrmFixtures';
import { CatMikroOrm } from '../model/CatMikroOrm';

describe(CatSetCommandToCatSetQueryMikroOrmConverterAsync.name, () => {
  let catSetCommandToCatSetQueryMikroOrmConverterAsync: CatSetCommandToCatSetQueryMikroOrmConverterAsync;

  beforeAll(() => {
    catSetCommandToCatSetQueryMikroOrmConverterAsync = new CatSetCommandToCatSetQueryMikroOrmConverterAsync();
  });

  describe('.convert()', () => {
    describe('when called', () => {
      let catSetCommandFixture: CatSetCommand;
      let catSetQueryMikroOrmFixture: EntityData<CatMikroOrm>;
      let result: unknown;

      beforeAll(async () => {
        catSetCommandFixture = CatSetCommandFixtures.any;
        catSetQueryMikroOrmFixture = CatSetQueryMikroOrmFixtures.any;

        result = await catSetCommandToCatSetQueryMikroOrmConverterAsync.convert(catSetCommandFixture);
      });

      it('should return a EntityData<CatMikroOrm>', () => {
        expect(result).toStrictEqual(catSetQueryMikroOrmFixture);
      });
    });
  });
});
