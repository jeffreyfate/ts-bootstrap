import { ISitter } from "../entity-boundary/ISitter";
import { ISittersPresenter } from "../presenter-boundary/ISittersPresenter";
import { TYPE } from "../types/types";
import { IPersistenceGateway } from "./../entity-boundary/IPersistenceGateway";

export class SittersPresenter implements ISittersPresenter {

  @inject(TYPE.Logger)
  @tagged("sitters-presenter", true)
  private readonly logger: Logger;
  @inject(TYPE.IPersistenceGateway)
  @tagged("sitters", true)
  private readonly sittersPersistenceGateway: IPersistenceGateway;

  present(): Promise<ISitter[]> {

  }
}
