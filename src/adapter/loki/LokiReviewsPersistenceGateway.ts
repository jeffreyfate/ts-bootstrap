import { inject, injectable, tagged } from "inversify";
import * as LokiJS from "lokijs";
import "reflect-metadata";
import { Logger } from "typescript-logging";
import { TYPE } from "../../types/types";
import { IReview } from "./../../entity-boundary/IReview";
import { ILokiReviewsPersistenceGateway } from "./ILokiReviewsPersistenceGateway";
import { LokiReview } from "./LokiReview";
import { LokiUtil } from "./LokiUtil";

@injectable()
export class LokiReviewsPersistenceGateway implements ILokiReviewsPersistenceGateway {

  @inject(TYPE.Logger)
  @tagged("loki", true)
  private readonly logger: Logger;
  @inject(TYPE.Loki)
  private readonly loki: LokiJS;
  @inject(TYPE.LokiReviews)
  private readonly reviews: string;
  @inject(TYPE.LokiReviewsIndices)
  private readonly reviewsIndices: string[];

  insert(object: IReview): IReview {
    const reviewsCollection = this.init();
    return reviewsCollection.insert(object);
  }

  update(object: IReview): IReview {
    const reviewsCollection = this.init();
    return reviewsCollection.update(object);
  }

  findLokiReviewsByEmail(searchEmail: string): LokiReview[] {
    const reviewsCollection = this.init();
    const result = reviewsCollection.chain()
      .find({sitter_email: searchEmail})
      .data();
    return result;
  }

  findBySitterEmail(searchEmail: string): IReview[] {
    return this.findLokiReviewsByEmail(searchEmail)
      .map(LokiUtil.stripLokiMeta);
  }

  getAll(): IReview[] {
    const reviewsCollection = this.init();
    return reviewsCollection.chain()
      .data()
      .map(LokiUtil.stripLokiMeta);
  }

  private init(): LokiJS.Collection {
    let reviewsCollection = this.loki.getCollection(this.reviews);
    if (!reviewsCollection) {
      reviewsCollection = this.loki.addCollection(this.reviews, { indices: this.reviewsIndices });
    }
    return reviewsCollection;
  }
}
