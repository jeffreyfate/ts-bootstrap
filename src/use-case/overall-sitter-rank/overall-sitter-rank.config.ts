import { Container } from "inversify";
import { Logger } from "typescript-logging";
import { TYPE } from "../../types/types";
import { ISitterScore } from "../../use-case-boundary/sitter-score/ISitterScore";
import { LokiReviewsPersistenceGateway } from "./../../adapter/loki/LokiReviewsPersistenceGateway";
import { LokiSittersPersistenceGateway } from "./../../adapter/loki/LokiSittersPersistenceGateway";
import { IPersistenceGateway } from "./../../entity-boundary/IPersistenceGateway";
import { ConfigFactory } from "./../../util/config.log4j";
import { SitterScore } from "./../sitter-score/SitterScore";
import { OverallSitterRank } from "./OverallSitterRank";

const OverallSitterRankContainer = new Container();

OverallSitterRankContainer.bind<IPersistenceGateway>(TYPE.IPersistenceGateway).to(LokiReviewsPersistenceGateway)
    .whenTargetTagged("reviews", true);
OverallSitterRankContainer.bind<IPersistenceGateway>(TYPE.IPersistenceGateway).to(LokiSittersPersistenceGateway)
    .whenTargetTagged("sitters", true);

OverallSitterRankContainer.bind<Logger>(TYPE.Logger).toConstantValue(ConfigFactory.getLogger(
    "use-case.overall-sitter-rank")).whenTargetTagged("overall-sitter-rank", true);

OverallSitterRankContainer.bind<ISitterScore>(TYPE.ISitterScore).to(SitterScore);

export { OverallSitterRankContainer };
