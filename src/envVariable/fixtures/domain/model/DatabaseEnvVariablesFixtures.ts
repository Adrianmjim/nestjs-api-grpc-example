import { DatabaseEnvVariables } from '../../../domain/model/DatabaseEnvVariables';

export class DatabaseEnvVariablesFixtures {
  public static get any(): DatabaseEnvVariables {
    const databaseEnvVariables: DatabaseEnvVariables = {
      DB_DATABASE: 'DB-database',
      DB_HOST: 'DB-host',
      DB_PASSWORD: 'boss',
      DB_PORT: 12345,
      DB_READ_REPLICA_HOSTS: ['DB-host'],
      DB_USER: 'random-user',
    };

    return databaseEnvVariables;
  }
}
