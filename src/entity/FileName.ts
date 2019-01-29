import { IName } from "../entity-boundary/IName";

export class FileName implements IName {
  constructor(
    readonly name: string,
  ) {}

  [Symbol.toPrimitive](hint: "default"): string {
    return this.name;
  }
}
