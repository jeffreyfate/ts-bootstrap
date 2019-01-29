export interface IOverallSitterRank {
  calculate(sitterEmail: string): Promise<number>;
}
