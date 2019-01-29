import { URL } from "url";
import { IReview } from "../entity-boundary/IReview";

export class Review implements IReview {
  constructor(
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
