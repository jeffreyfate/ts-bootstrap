import { IName } from "./IName";

export interface IReadGateway {
  read<T>(filename: IName): Promise<T[]>;
}
