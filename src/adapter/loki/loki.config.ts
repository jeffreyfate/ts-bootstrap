import { Container } from "inversify";
import * as LokiJS from "lokijs";
import { Logger } from "typescript-logging";
import { TYPE } from "../../types/types";
import { ConfigFactory } from "../../util/config.log4j";

const LokiContainer = new Container();

LokiContainer.bind<LokiJS>(TYPE.Loki).toConstantValue(new LokiJS("Rover"));
LokiContainer.bind<string>(TYPE.LokiReviews).toConstantValue("Reviews");
LokiContainer.bind<string[]>(TYPE.LokiReviewsIndices).toConstantValue(["sitter_email"]);
LokiContainer.bind<string>(TYPE.LokiSitters).toConstantValue("Sitters");
LokiContainer.bind<string[]>(TYPE.LokiSittersIndices).toConstantValue(["sitter_email"]);

LokiContainer.bind<Logger>(TYPE.Logger).toConstantValue(ConfigFactory.getLogger("adapter.loki"))
    .whenTargetTagged("loki", true);

export { LokiContainer };
