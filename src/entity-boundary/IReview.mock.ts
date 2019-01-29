import { URL } from "url";
import { IReview } from "./IReview";

const getDefaults = (): IReview => ({
  rating: 5,
  sitter_image: new URL("http://mock"),
  end_date: new Date(),
  text: "text",
  owner_image: new URL("http://mock"),
  dogs: "dogs",
  sitter: "sitter",
  owner: "owner",
  start_date: new Date(),
  sitter_phone_number: "phone",
  sitter_email: "sitterEmail",
  owner_phone_number: "phone",
  owner_email: "ownerEmail",
});

export const getReviewMock = (p?: Partial<IReview>): IReview => ({
  ...getDefaults(),
  ...p,
});
