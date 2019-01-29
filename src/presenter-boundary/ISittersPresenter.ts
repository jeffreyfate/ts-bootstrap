import { ISitter } from "../entity-boundary/ISitter";

export interface ISittersPresenter {
  present(): Promise<ISitter[]>;
}
