import { DatabaseConfig } from '../../../infrastructure/database/DatabaseConfig';

export class DatabaseConfigFixtures {
  public static get any(): DatabaseConfig {
    const DatabaseConfig: DatabaseConfig = {
      database: 'DATABASE',
      host: 'HOST',
      password: 'PASSWORD',
      port: 1234,
      readReplicaHosts: ['REPLICA-HOST'],
      user: 'USER',
    };

    return DatabaseConfig;
  }
}
