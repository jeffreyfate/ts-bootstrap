export interface IPhoneNumber {
  readonly phoneNumber: string;

  [Symbol.toPrimitive](hint: "default"): string;
}
