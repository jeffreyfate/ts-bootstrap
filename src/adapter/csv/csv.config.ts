import { Container } from "inversify";
import { Logger } from "typescript-logging";
import { TYPE } from "../../types/types";
import { ConfigFactory } from "./../../util/config.log4j";
import { FsReadStreamFactory } from "./FsReadStreamFactory";

const CsvContainer = new Container();

CsvContainer.bind<FsReadStreamFactory>(TYPE.IReadStreamFactory).toConstantValue(new FsReadStreamFactory());

CsvContainer.bind<Logger>(TYPE.Logger).toConstantValue(ConfigFactory.getLogger("adapter.csv"));

export { CsvContainer };
