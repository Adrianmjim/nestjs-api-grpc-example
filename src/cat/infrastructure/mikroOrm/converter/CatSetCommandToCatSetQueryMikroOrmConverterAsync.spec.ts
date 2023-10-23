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
    describe('having a CatSetCommand with bornDate', () => {
      describe('when called', () => {
        let catSetCommandFixture: CatSetCommand;
        let catSetQueryMikroOrmFixture: EntityData<CatMikroOrm>;
        let result: unknown;

        beforeAll(async () => {
          catSetCommandFixture = CatSetCommandFixtures.withBornDate;
          catSetQueryMikroOrmFixture = CatSetQueryMikroOrmFixtures.withBornDate;

          result = await catSetCommandToCatSetQueryMikroOrmConverterAsync.convert(catSetCommandFixture);
        });

        it('should return a EntityData<CatMikroOrm>', () => {
          expect(result).toStrictEqual(catSetQueryMikroOrmFixture);
        });
      });
    });

    describe('having a CatSetCommand with color', () => {
      describe('when called', () => {
        let catSetCommandFixture: CatSetCommand;
        let catSetQueryMikroOrmFixture: EntityData<CatMikroOrm>;
        let result: unknown;

        beforeAll(async () => {
          catSetCommandFixture = CatSetCommandFixtures.withColor;
          catSetQueryMikroOrmFixture = CatSetQueryMikroOrmFixtures.withColor;

          result = await catSetCommandToCatSetQueryMikroOrmConverterAsync.convert(catSetCommandFixture);
        });

        it('should return a EntityData<CatMikroOrm>', () => {
          expect(result).toStrictEqual(catSetQueryMikroOrmFixture);
        });
      });
    });

    describe('having a CatSetCommand with name', () => {
      describe('when called', () => {
        let catSetCommandFixture: CatSetCommand;
        let catSetQueryMikroOrmFixture: EntityData<CatMikroOrm>;
        let result: unknown;

        beforeAll(async () => {
          catSetCommandFixture = CatSetCommandFixtures.withName;
          catSetQueryMikroOrmFixture = CatSetQueryMikroOrmFixtures.withName;

          result = await catSetCommandToCatSetQueryMikroOrmConverterAsync.convert(catSetCommandFixture);
        });

        it('should return a EntityData<CatMikroOrm>', () => {
          expect(result).toStrictEqual(catSetQueryMikroOrmFixture);
        });
      });
    });
  });
});
