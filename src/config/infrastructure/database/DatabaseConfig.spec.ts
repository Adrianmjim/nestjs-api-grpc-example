import { DatabaseConfig } from './DatabaseConfig';
import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { DatabaseEnvVariables } from '../../../envVariable/domain/model/DatabaseEnvVariables';
import { DatabaseEnvVariablesFixtures } from '../../../envVariable/fixtures/domain/model/DatabaseEnvVariablesFixtures';

describe(DatabaseConfig.name, () => {
  describe('when instantiated', () => {
    let databaseEnvVariablesFixture: DatabaseEnvVariables;
    let loadDatabaseEnvVariablesAdapter: jest.Mocked<LoadDataAdapter<DatabaseEnvVariables>>;
    let databaseConfig: DatabaseConfig;

    beforeAll(() => {
      databaseEnvVariablesFixture = DatabaseEnvVariablesFixtures.any;
      loadDatabaseEnvVariablesAdapter = {
        loadData: jest.fn().mockReturnValueOnce(databaseEnvVariablesFixture),
      };

      databaseConfig = new DatabaseConfig(loadDatabaseEnvVariablesAdapter);
    });

    it('should have all its properties set', () => {
      expect(databaseConfig.database).toStrictEqual(databaseEnvVariablesFixture.DB_DATABASE);
      expect(databaseConfig.host).toStrictEqual(databaseEnvVariablesFixture.DB_HOST);
      expect(databaseConfig.password).toStrictEqual(databaseEnvVariablesFixture.DB_PASSWORD);
      expect(databaseConfig.port).toStrictEqual(databaseEnvVariablesFixture.DB_PORT);
      expect(databaseConfig.user).toStrictEqual(databaseEnvVariablesFixture.DB_USER);
    });
  });
});
