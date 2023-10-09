import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('AppService', 'GetStatus')
  public status(): { status: 'ok' } {
    const result: { status: 'ok' } = { status: 'ok' };

    return result;
  }
}
