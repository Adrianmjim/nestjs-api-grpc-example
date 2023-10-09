import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

import { DatabaseConfigFixtures } from '../database/DatabaseConfigFixtures';

export class MikroOrmModuleOptionsFixtures {
  public static get any(): MikroOrmModuleOptions {
    const mikroOrmModuleOptions: MikroOrmModuleOptions = {
      allowGlobalContext: true,
      autoLoadEntities: true,
      dbName: DatabaseConfigFixtures.any.database,
      forceUndefined: true,
      host: DatabaseConfigFixtures.any.host,
      migrations: {
        path: 'dist/common/infrastructure/mikroOrm/migrations',
        pathTs: 'src/common/infrastructure/mikroOrm/migrations',
      },
      password: DatabaseConfigFixtures.any.password,
      port: DatabaseConfigFixtures.any.port,
      type: 'postgresql',
      user: DatabaseConfigFixtures.any.user,
    };

    return mikroOrmModuleOptions;
  }
}
