export interface IName {
  readonly name: string;

  [Symbol.toPrimitive](hint: "default"): string;
}
