import { IPhoneNumber } from "../entity-boundary/IPhoneNumber";

export class PhoneNumber implements IPhoneNumber {
  constructor(
    readonly phoneNumber: string,
  ) {}

  [Symbol.toPrimitive](hint: "default"): string {
    return this.phoneNumber;
  }
}
