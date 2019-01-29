import { URL } from "url";
import { IStringAny } from "./IStringAny";

export interface IReview extends IStringAny {
  readonly rating: number;
  readonly sitter_image: URL;
  readonly end_date: Date;
  readonly text: string;
  readonly owner_image: URL;
  readonly dogs: string;
  readonly sitter: string;
  readonly owner: string;
  readonly start_date: Date;
  readonly sitter_phone_number: string;
  readonly sitter_email: string;
  readonly owner_phone_number: string;
  readonly owner_email: string;
}
