import { Substitute } from "@fluffy-spoon/substitute";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Container } from "inversify";
import { URL } from "url";
import { LokiContainer } from "../../adapter/loki/loki.config";
import { IPersistenceGateway } from "../../entity-boundary/IPersistenceGateway";
import { IReview } from "../../entity-boundary/IReview";
import { getReviewMock } from "../../entity-boundary/IReview.mock";
import { ISitter } from "../../entity-boundary/ISitter";
import { TYPE } from "../../types/types";
import { IOverallSitterRank } from "../../use-case-boundary/overall-sitter-rank/IOverallSitterRank";
import { ISitterScore } from "../../use-case-boundary/sitter-score/ISitterScore";
import { Sitter } from "./../../entity/Sitter";
import { OverallSitterRankContainer } from "./overall-sitter-rank.config";
import { OverallSitterRank } from "./OverallSitterRank";

chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;

describe("OverallSitterRank", () => {

  const overallSitterRankContainer = new Container();
  overallSitterRankContainer.bind<IOverallSitterRank>(TYPE.IOverallSitterRank)
      .to(OverallSitterRank);

  const testContainer = Container.merge(
      Container.merge(LokiContainer, OverallSitterRankContainer),
      overallSitterRankContainer);

  beforeEach(() => {
    testContainer.snapshot();
    testContainer.unbind(TYPE.IPersistenceGateway);
    testContainer.unbind(TYPE.ISitterScore);
  });

  afterEach(() => {
    testContainer.restore();
  });

  describe("calculate", () => {
    it("generates average rating", async () => {
      const reviews: IReview[] = [];
      for (let i = 1; i <= 5; i++) {
        reviews.push(getReviewMock({rating: i}));
      }
      const sitters: ISitter[] = [];
      sitters.push(new Sitter(new URL("http://sitterimage"), "Timmy O'Toole", "+1234567890", "sitterEmail",
          1.346, 0, 0));

      const mockedReviewsPersistenceGateway = Substitute.for<IPersistenceGateway>();
      const mockedSittersPersistenceGateway = Substitute.for<IPersistenceGateway>();
      const mockedSitterScore = Substitute.for<ISitterScore>();

      mockedReviewsPersistenceGateway.findBySitterEmail("sitterEmail").returns(reviews);
      mockedSittersPersistenceGateway.findBySitterEmail("sitterEmail").returns(sitters);
      mockedSitterScore.calculate("Timmy O'Toole").returns(new Promise((resolve, reject) => resolve(1.346)));
      testContainer
        .bind<IPersistenceGateway>(TYPE.IPersistenceGateway)
        .toConstantValue(mockedReviewsPersistenceGateway)
        .whenTargetTagged("reviews", true);
      testContainer
        .bind<IPersistenceGateway>(TYPE.IPersistenceGateway)
        .toConstantValue(mockedSittersPersistenceGateway)
        .whenTargetTagged("sitters", true);
      testContainer
        .bind<ISitterScore>(TYPE.ISitterScore)
        .toConstantValue(mockedSitterScore);

      const overallSitterRank = testContainer.get<IOverallSitterRank>(TYPE.IOverallSitterRank);
      const result = await overallSitterRank.calculate("sitterEmail");

      expect(result).to.eq(2.096);
      mockedReviewsPersistenceGateway.received(1).findBySitterEmail("sitterEmail");
      mockedSittersPersistenceGateway.received(1).findBySitterEmail("sitterEmail");
      mockedSitterScore.received(1).calculate("Timmy O'Toole");
    });

    it("rejects when no reviews found", () => {
      const reviews: IReview[] = [];

      const mockedReviewsPersistenceGateway = Substitute.for<IPersistenceGateway>();
      const mockedSittersPersistenceGateway = Substitute.for<IPersistenceGateway>();
      const mockedSitterScore = Substitute.for<ISitterScore>();

      mockedReviewsPersistenceGateway.findBySitterEmail("sitterEmail").returns(reviews);
      testContainer
        .bind<IPersistenceGateway>(TYPE.IPersistenceGateway)
        .toConstantValue(mockedReviewsPersistenceGateway)
        .whenTargetTagged("reviews", true);
      testContainer
        .bind<IPersistenceGateway>(TYPE.IPersistenceGateway)
        .toConstantValue(mockedSittersPersistenceGateway)
        .whenTargetTagged("sitters", true);
      testContainer
        .bind<ISitterScore>(TYPE.ISitterScore)
        .toConstantValue(mockedSitterScore);

      const overallSitterRank = testContainer.get<IOverallSitterRank>(TYPE.IOverallSitterRank);
      assert.isRejected(overallSitterRank.calculate("sitterEmail"));

      mockedReviewsPersistenceGateway.received(1).findBySitterEmail("sitterEmail");
      mockedSittersPersistenceGateway.didNotReceive();
      mockedSitterScore.didNotReceive();
    });
  });
});
