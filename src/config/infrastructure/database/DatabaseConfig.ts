import { Inject, Injectable } from '@nestjs/common';

import { LoadDataAdapter } from '../../../env/domain/adapter/LoadDataAdapter';
import { DatabaseEnvVariables } from '../../../envVariable/domain/model/DatabaseEnvVariables';
import { LoadDatabaseEnvVariablesDotenvAdapter } from '../../../envVariable/infrastructure/adapter/LoadDatabaseEnvVariablesDotenvAdapter';

@Injectable()
export class DatabaseConfig {
  public readonly database: string;
  public readonly host: string;
  public readonly readReplicaHosts: string[];
  public readonly password: string;
  public readonly port: number;
  public readonly user: string;

  public constructor(
    @Inject(LoadDatabaseEnvVariablesDotenvAdapter)
    loadDatabaseEnvVariablesDotenvAdaptersAdapter: LoadDataAdapter<DatabaseEnvVariables>,
  ) {
    const databaseEnvVariables: DatabaseEnvVariables = loadDatabaseEnvVariablesDotenvAdaptersAdapter.loadData();

    this.database = databaseEnvVariables.DB_DATABASE;
    this.host = databaseEnvVariables.DB_HOST;
    this.password = databaseEnvVariables.DB_PASSWORD;
    this.port = databaseEnvVariables.DB_PORT;
    this.readReplicaHosts = databaseEnvVariables.DB_READ_REPLICA_HOSTS;
    this.user = databaseEnvVariables.DB_USER;
  }
}
