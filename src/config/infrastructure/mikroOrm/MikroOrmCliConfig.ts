import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { DatabaseEnvVariables } from '../../../envVariable/domain/model/DatabaseEnvVariables';
import { LoadDatabaseEnvVariablesDotenvAdapter } from '../../../envVariable/infrastructure/adapter/LoadDatabaseEnvVariablesDotenvAdapter';
import { DatabaseConfig } from '../database/DatabaseConfig';

const loadDatabaseEnvVariablesAdapter: LoadDataAdapter<DatabaseEnvVariables> =
  new LoadDatabaseEnvVariablesDotenvAdapter();

const databaseConfig: DatabaseConfig = new DatabaseConfig(loadDatabaseEnvVariablesAdapter);

export default {
  dbName: databaseConfig.database,
  entities: ['./dist/*/infrastructure/mikroOrm/model/!(AnyEntity)*.js'],
  entitiesTs: ['./src/*/infrastructure/mikroOrm/model/!(AnyEntity)*.ts'],
  host: databaseConfig.host,
  migrations: {
    path: 'dist/common/infrastructure/mikroOrm/migrations',
    pathTs: 'src/common/infrastructure/mikroOrm/migrations',
  },
  password: databaseConfig.password,
  port: databaseConfig.port,
  type: 'postgresql',
  user: databaseConfig.user,
};
