import { ConnectionOptions, Configuration } from '@mikro-orm/core/utils/Configuration';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

import { DatabaseConfig } from './DatabaseConfig';

export function getMikroOrmModuleOptions(
  databaseConfig: DatabaseConfig,
  allowGlobalContext: boolean = true,
  platformType: keyof typeof Configuration.PLATFORMS = 'postgresql',
): MikroOrmModuleOptions {
  const mikroOrmModuleOptions: MikroOrmModuleOptions = {
    allowGlobalContext,
    autoLoadEntities: true,
    dbName: databaseConfig.database,
    forceUndefined: true,
    host: databaseConfig.host,
    migrations: {
      path: 'dist/common/infrastructure/mikroOrm/migrations',
      pathTs: 'src/common/infrastructure/mikroOrm/migrations',
    },
    password: databaseConfig.password,
    port: databaseConfig.port,
    preferReadReplicas: true,
    replicas: databaseConfig.readReplicaHosts.map(
      (host: string): Partial<ConnectionOptions> => ({
        host,
      }),
    ),
    type: platformType,
    user: databaseConfig.user,
  };

  return mikroOrmModuleOptions;
}
