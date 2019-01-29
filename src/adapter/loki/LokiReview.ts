import { URL } from "url";
import { IReview } from "../../entity-boundary/IReview";

export class LokiReview implements IReview, LokiObj {
  constructor(
    readonly $loki: number,
    readonly meta: {
      readonly created: number;
      readonly revision: number;
      readonly updated: number;
      readonly version: number;
    },
    readonly rating: number,
    readonly sitter_image: URL,
    readonly end_date: Date,
    readonly text: string,
    readonly owner_image: URL,
    readonly dogs: string,
    readonly sitter: string,
    readonly owner: string,
    readonly start_date: Date,
    readonly sitter_phone_number: string,
    readonly sitter_email: string,
    readonly owner_phone_number: string,
    readonly owner_email: string,
  ) {}
}
