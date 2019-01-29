import { IPersistenceGateway } from "../../entity-boundary/IPersistenceGateway";
import { LokiReview } from "./LokiReview";

export interface ILokiReviewsPersistenceGateway extends IPersistenceGateway {
  findLokiReviewsByEmail(searchEmail: string): LokiReview[];
}
