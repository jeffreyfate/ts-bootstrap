import { Container } from "inversify";
import { Logger } from "typescript-logging";
import { TYPE } from "../../types/types";
import { ConfigFactory } from "../../util/config.log4j";

const SitterScoreContainer = new Container();

SitterScoreContainer.bind<Logger>(TYPE.Logger).toConstantValue(ConfigFactory.getLogger(
    "use-case.sitter-score")).whenTargetTagged("sitter-score", true);

export { SitterScoreContainer };
