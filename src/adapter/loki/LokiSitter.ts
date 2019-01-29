import { URL } from "url";
import { ISitter } from "./../../entity-boundary/ISitter";

export class LokiSitter implements ISitter, LokiObj {
  constructor(
    readonly $loki: number,
    readonly meta: {
      readonly created: number;
      readonly revision: number;
      readonly updated: number;
      readonly version: number;
    },
    readonly sitter_image: URL,
    readonly sitter: string,
    readonly sitter_phone_number: string,
    readonly sitter_email: string,
    readonly sitter_score: number,
    readonly ratings_score: number,
    readonly overall_sitter_rank: number,
  ) {}
}
