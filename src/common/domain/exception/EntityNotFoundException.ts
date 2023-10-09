import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  public constructor(message: string) {
    super(message);
  }
}
