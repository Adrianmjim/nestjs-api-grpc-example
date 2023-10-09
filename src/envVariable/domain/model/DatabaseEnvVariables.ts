export interface DatabaseEnvVariables {
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USER: string;
  DB_READ_REPLICA_HOSTS: string[];
}
