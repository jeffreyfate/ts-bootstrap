import { inject, injectable, tagged } from "inversify";
import * as LokiJS from "lokijs";
import "reflect-metadata";
import { Logger } from "typescript-logging";
import { TYPE } from "../../types/types";
import { ISitterScore } from "../../use-case-boundary/sitter-score/ISitterScore";

@injectable()
export class SitterScore implements ISitterScore {

  @inject(TYPE.Logger)
  @tagged("sitter-score", true)
  private readonly logger: Logger;

  calculate(sitterName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const totalUniqueLetters: number = sitterName.split("")
          .filter((value, index, array) => value.match("[a-zA-Z]"))
          .filter((value, index, array) => array.indexOf(value) === index)
          .map((value, index, array) => 1)
          .reduce((agg, curr) => agg += curr);
      resolve((totalUniqueLetters * 5) / 26);
    });
  }
}
