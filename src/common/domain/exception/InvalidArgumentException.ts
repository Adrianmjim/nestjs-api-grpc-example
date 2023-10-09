import { ConflictException } from '@nestjs/common';

export class InvalidArgumentException extends ConflictException {
  public constructor(message: string) {
    super(message);
  }
}
