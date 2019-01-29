import { inject, injectable } from "inversify";
import * as readline from "readline";
import "reflect-metadata";
import { Logger } from "typescript-logging";
import { TYPE } from "../../types/types";
import { IName } from "./../../entity-boundary/IName";
import { IReadGateway } from "./../../entity-boundary/IReadGateway";
import { IReadStreamFactory } from "./IReadStreamFactory";

@injectable()
export class CsvParseReadGateway implements IReadGateway {

  @inject(TYPE.Logger)
  private readonly logger: Logger;
  @inject(TYPE.IReadStreamFactory)
  private readonly readStreamFactory: IReadStreamFactory;

  read<T>(filename: IName): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const ts: T[] = [];
      const headers: string[] = [];
      const values: any[][] = [];
      type tkeys = keyof T;

      readline.createInterface({
        input: this.readStreamFactory.read(filename),
      }).on("line", (line) => {
        if (headers.length === 0) {
          for (const split of line.split(",")) {
            headers.push(split);
          }
        } else {
          const value: any[] = [];
          for (const split of line.split(",")) {
            value.push(split);
          }
          if (value.length !== headers.length) {
            reject(new Error("Incompatible input; values not same length as headers!"));
          }
          values.push(value);
        }
      }).on("error", (err) => {
        this.logger.error(err);
      }).on("close", () => {
        values.forEach((value, valueIndex) => {
          const obj = {};
          value.forEach((val, valIndex) => {
            obj[headers[valIndex]] = val;
          });
          ts.push(obj as T);
        });
        resolve(ts);
      });
    });
  }
}
