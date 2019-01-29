import { OverallSitterRank } from "./../use-case/overall-sitter-rank/OverallSitterRank";
const TYPE = {
  CsvParser: Symbol.for("CsvParser"),
  ILokiReviewsPersistenceGateway: Symbol.for("ILokiReviewsPersistenceGateway"),
  ILokiSittersPersistenceGateway: Symbol.for("ILokiSittersPersistenceGateway"),
  IName: Symbol.for("IName"),
  IOverallSitterRank: Symbol.for("IOverallSitterRank"),
  IPersistenceGateway: Symbol.for("IPersistenceGateway"),
  IReadGateway: Symbol.for("IReadGateway"),
  IReadStreamFactory: Symbol.for("IReadStreamFactory"),
  IReview: Symbol.for("IReview"),
  ISitterScore: Symbol.for("ISitterScore"),
  IStringAny: Symbol.for("IStringAny"),
  Logger: Symbol.for("Logger"),
  Loki: Symbol.for("Loki"),
  LokiReviews: Symbol.for("LokiReviews"),
  LokiReviewsIndices: Symbol.for("LokiReviewsIndices"),
  LokiSitters: Symbol.for("LokiSitters"),
  LokiSittersIndices: Symbol.for("LokiSittersIndices"),
  ReadStream: Symbol.for("ReadStream"),
};

export { TYPE };
