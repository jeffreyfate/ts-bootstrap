import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Container } from "inversify";
import { IReview } from "../../entity-boundary/IReview";
import { getReviewMock } from "../../entity-boundary/IReview.mock";
import { TYPE } from "../../types/types";
import { ISitterScore } from "./../../use-case-boundary/sitter-score/ISitterScore";
import { SitterScoreContainer } from "./sitter-score.config";
import { SitterScore } from "./SitterScore";

chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;

describe("SitterScore", () => {

  const sitterScoreContainer = new Container();
  sitterScoreContainer.bind<ISitterScore>(TYPE.ISitterScore)
      .to(SitterScore);

  const testContainer = Container.merge(SitterScoreContainer, sitterScoreContainer);

  beforeEach(() => {
    testContainer.snapshot();
  });

  afterEach(() => {
    testContainer.restore();
  });

  describe("calculate", () => {
    it("generates sitter score", async () => {
      const reviews: IReview[] = [];
      for (let i = 1; i <= 5; i++) {
        reviews.push(getReviewMock({rating: i}));
      }

      const sitterScore = testContainer.get<ISitterScore>(TYPE.ISitterScore);
      const result = await sitterScore.calculate("Johnny 'Dog Whisperer' Doe");

      expect(result).to.eq(2.5);
    });
  });
});
