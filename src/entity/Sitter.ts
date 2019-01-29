import { URL } from "url";
import { ISitter } from "./../entity-boundary/ISitter";

export class Sitter implements ISitter {
  constructor(
    readonly sitter_image: URL,
    readonly sitter: string,
    readonly sitter_phone_number: string,
    readonly sitter_email: string,
    readonly sitter_score: number,
    readonly ratings_score: number,
    readonly overall_sitter_rank: number,
  ) {}
}
