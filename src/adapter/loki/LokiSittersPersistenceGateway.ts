import { inject, injectable, tagged } from "inversify";
import * as LokiJS from "lokijs";
import "reflect-metadata";
import { Logger } from "typescript-logging";
import { ISitter } from "../../entity-boundary/ISitter";
import { TYPE } from "../../types/types";
import { ILokiSittersPersistenceGateway } from "./ILokiSittersPersistenceGateway";
import { LokiSitter } from "./LokiSitter";
import { LokiUtil } from "./LokiUtil";

@injectable()
export class LokiSittersPersistenceGateway implements ILokiSittersPersistenceGateway {

  @inject(TYPE.Logger)
  @tagged("loki", true)
  private readonly logger: Logger;
  @inject(TYPE.Loki)
  private readonly loki: LokiJS;
  @inject(TYPE.LokiSitters)
  private readonly sitters: string;
  @inject(TYPE.LokiSittersIndices)
  private readonly sittersIndices: string[];

  insert(object: ISitter): ISitter {
    const sittersCollection = this.init();
    return sittersCollection.insert(object);
  }

  update(object: ISitter): ISitter {
    const sittersCollection = this.init();
    return sittersCollection.update(object);
  }

  findLokiSittersByEmail(searchEmail: string): LokiSitter[] {
    const sittersCollection = this.init();
    const result = sittersCollection.chain()
      .find({sitter_email: searchEmail})
      .data();
    return result;
  }

  findBySitterEmail(searchEmail: string): ISitter[] {
    return this.findLokiSittersByEmail(searchEmail)
      .map(LokiUtil.stripLokiMeta);
  }

  getAll(): ISitter[] {
    const sittersCollection = this.init();
    return sittersCollection.chain()
      .data()
      .map(LokiUtil.stripLokiMeta);
  }

  private init(): LokiJS.Collection {
    let sittersCollection = this.loki.getCollection(this.sitters);
    if (!sittersCollection) {
      sittersCollection = this.loki.addCollection(this.sitters, { indices: this.sittersIndices });
    }
    return sittersCollection;
  }
}
