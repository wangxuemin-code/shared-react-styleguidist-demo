import * as uuid from 'uuid';

export class UuidGenerator {
  public static generate(): string {
    return uuid.v4();
  }
}
