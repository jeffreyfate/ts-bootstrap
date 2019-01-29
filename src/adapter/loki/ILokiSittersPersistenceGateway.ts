import { IPersistenceGateway } from "../../entity-boundary/IPersistenceGateway";
import { LokiSitter } from "./LokiSitter";

export interface ILokiSittersPersistenceGateway extends IPersistenceGateway {
  findLokiSittersByEmail(searchEmail: string): LokiSitter[];
}
