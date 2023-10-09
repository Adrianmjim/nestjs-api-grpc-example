import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

import { DatabaseConfig } from './DatabaseConfig';
import { getMikroOrmModuleOptions } from './getMikroOrmModuleOptions';
import { DatabaseConfigFixtures } from '../../fixtures/infrastructure/database/DatabaseConfigFixtures';
import { MikroOrmModuleOptionsFixtures } from '../../fixtures/infrastructure/mikroOrm/MikroOrmModuleOptionsFixtures';

describe(getMikroOrmModuleOptions.name, () => {
  let mikroOrmConfig: DatabaseConfig;
  beforeAll(() => {
    mikroOrmConfig = DatabaseConfigFixtures.any;
  });

  describe('when called', () => {
    let result: MikroOrmModuleOptions;
    let mikroOrmModuleOptionsFixture: MikroOrmModuleOptions;

    beforeAll(() => {
      mikroOrmModuleOptionsFixture = MikroOrmModuleOptionsFixtures.any;

      result = getMikroOrmModuleOptions(mikroOrmConfig);
    });

    it('should return the correct config', () => {
      expect(result).toMatchObject(mikroOrmModuleOptionsFixture);
    });
  });
});
