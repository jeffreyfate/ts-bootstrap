export class LokiUtil {
  static stripLokiMeta<T extends LokiObj>(object: T): T {
    delete object.$loki;
    delete object.meta;
    return object;
  }
}
