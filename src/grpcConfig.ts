import { join } from 'path';

import { GrpcOptions, Transport } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcOptions: GrpcOptions = addReflectionToGrpcConfig({
  options: {
    package: 'api',
    protoPath: join(__dirname, '../proto/api.proto'),
    url: '0.0.0.0:5000',
  },
  transport: Transport.GRPC,
});
