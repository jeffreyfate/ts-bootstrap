import { Readable } from "stream";

export interface IReadStreamFactory {
  read(filename: IName): Readable;
}
