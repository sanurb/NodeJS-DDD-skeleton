import { ValueObject } from "./ValueObject";

export class NumberValueObject extends ValueObject<number> {
  public lessThan(other: number): boolean {
    return this.value < other;
  }

  public isBiggerThan(other: number): boolean {
    return this.value > other;
  }
}
