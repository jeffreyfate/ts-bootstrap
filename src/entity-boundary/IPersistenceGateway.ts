import { IName } from "./IName";

export interface IPersistenceGateway {
  insert(object: T): T;
  update(object: T): T;
  findBySitterEmail(searchEmail: string): T[];
  getAll(): T[];
}
