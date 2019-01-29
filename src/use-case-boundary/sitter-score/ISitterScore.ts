export interface ISitterScore {
  calculate(sitterName: string): Promise<number>;
}
