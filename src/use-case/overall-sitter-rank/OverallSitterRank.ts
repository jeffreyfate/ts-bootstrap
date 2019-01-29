import { inject, injectable, tagged } from "inversify";
import * as LokiJS from "lokijs";
import "reflect-metadata";
import { Logger } from "typescript-logging";
import { IPersistenceGateway } from "../../entity-boundary/IPersistenceGateway";
import { ISitter } from "../../entity-boundary/ISitter";
import { TYPE } from "../../types/types";
import { IOverallSitterRank } from "../../use-case-boundary/overall-sitter-rank/IOverallSitterRank";
import { ISitterScore } from "../../use-case-boundary/sitter-score/ISitterScore";
import { IReview } from "./../../entity-boundary/IReview";

@injectable()
export class OverallSitterRank implements IOverallSitterRank {

  @inject(TYPE.Logger)
  @tagged("overall-sitter-rank", true)
  private readonly logger: Logger;
  @inject(TYPE.IPersistenceGateway)
  @tagged("reviews", true)
  private readonly reviewsPersistenceGateway: IPersistenceGateway;
  @inject(TYPE.IPersistenceGateway)
  @tagged("sitters", true)
  private readonly sittersPersistenceGateway: IPersistenceGateway;
  @inject(TYPE.ISitterScore)
  private readonly sitterScore: ISitterScore;

  calculate(sitterEmail: string): Promise<number> {
    return new Promise(async (resolve, reject) => {
      const reviews: IReview[] = this.reviewsPersistenceGateway.findBySitterEmail(sitterEmail);
      let rating: number;
      if (reviews.length > 0) {
        rating = reviews
            .map((review) => review.rating)
            .reduce((agg, curr) => agg + curr) / reviews.length;
        if (reviews.length < 10) {
          const sitters: ISitter[] = this.sittersPersistenceGateway.findBySitterEmail(sitterEmail);
          if (sitters.length < 1) {
            reject(new Error(`No sitter found with email '${sitterEmail}'!`));
          } else if (sitters.length > 1) {
            reject(new Error(`Multiple sitters found with email '${sitterEmail}'!`));
          } else {
            rating = await this.sitterScore.calculate(sitters[0].sitter) +
                ((rating * reviews.length) / 20);
          }
        }
        resolve(rating);
      } else {
        reject(new Error(`Reviews for sitter with email '${sitterEmail}' not found!`));
      }
    });
  }
}
