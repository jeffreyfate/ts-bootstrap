import { URL } from "url";
import { ISitter } from "./ISitter";

const getDefaults = (): ISitter => ({
  overall_sitter_rank: 0,
  ratings_score: 1,
  sitter: "sitter",
  sitter_email: "sitterEmail",
  sitter_image: new URL("http://mock"),
  sitter_phone_number: "phone",
  sitter_score: 1,
});

export const getSitterMock = (p?: Partial<ISitter>): ISitter => ({
  ...getDefaults(),
  ...p,
});
