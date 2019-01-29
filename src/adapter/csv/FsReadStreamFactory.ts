import { createReadStream, ReadStream } from "fs";
import { injectable } from "inversify";
import { IName } from "./../../entity-boundary/IName";
import { IReadStreamFactory } from "./IReadStreamFactory";

@injectable()
export class FsReadStreamFactory implements IReadStreamFactory {

  read(filename: IName): ReadStream {
    return createReadStream(__dirname + "/../../../" + filename.name);
  }

}
