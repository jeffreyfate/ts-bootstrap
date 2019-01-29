import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Logger } from "typescript-logging";
import { URL } from "url";
import { IStringAny } from "../../entity-boundary/IStringAny";
import { FileName } from "../../entity/FileName";
import { PhoneNumber } from "../../entity/PhoneNumber";
import { IPersistenceGateway } from "./../../entity-boundary/IPersistenceGateway";
import { IReview } from "./../../entity-boundary/IReview";
import { LokiReviewsPersistenceGateway } from "./LokiReviewsPersistenceGateway";

chai.use(chaiAsPromised);

const assert = chai.assert;
const expect = chai.expect;

import { Container } from "inversify";
import { IReadGateway } from "../../entity-boundary/IReadGateway";
import { getReviewMock } from "../../entity-boundary/IReview.mock";
import { Review } from "../../entity/Review";
import { TYPE } from "../../types/types";
import { ILokiReviewsPersistenceGateway } from "./ILokiReviewsPersistenceGateway";
import { LokiContainer } from "./loki.config";
import { LokiReview } from "./LokiReview";

interface ITestType extends IStringAny {
  readonly test1: string;
  readonly test2: string;
}

describe("LokiReviewsPeristenceGateway", () => {
  const lokiReviewsPersistenceGatewayContainer = new Container();
  lokiReviewsPersistenceGatewayContainer.bind<ILokiReviewsPersistenceGateway>(TYPE.ILokiReviewsPersistenceGateway)
      .to(LokiReviewsPersistenceGateway);

  const testContainer = Container.merge(LokiContainer, lokiReviewsPersistenceGatewayContainer);
  testContainer.unbind(TYPE.LokiReviews);
  testContainer.bind<string>(TYPE.LokiReviews)
      .toConstantValue("LokiReviewsPeristenceGateway.integrated");

  const lokiReviewsPersistenceGateway = testContainer.get<ILokiReviewsPersistenceGateway>(
      TYPE.ILokiReviewsPersistenceGateway);

  beforeEach(() => {
    testContainer.snapshot();
  });

  afterEach(() => {
    testContainer.restore();
  });

  it("can insert", async () => {
    const review = new Review(1, new URL("http://sitterimage"), new Date(), "text", new URL("http://ownerimage"),
      "rover", "sitter", "owner", new Date(), "sitterPhone", "sitterEmail", "ownerPhone", "ownerEmail");

    const result = lokiReviewsPersistenceGateway.insert(review);

    assert.deepEqual(result, review);
  });

  it("can update", async () => {
    const review = new Review(1, new URL("http://sitterimage"), new Date(), "text", new URL("http://ownerimage"),
      "rover", "sitter", "owner", new Date(), "sitterPhone", "sitterEmail", "ownerPhone", "ownerEmail");

    lokiReviewsPersistenceGateway.insert(review);

    const found: LokiReview = lokiReviewsPersistenceGateway.findLokiReviewsByEmail("sitterEmail")[0];

    const foundReview = new LokiReview(found.$loki, found.meta, 2, found.sitter_image, found.end_date, found.text,
      found.owner_image, found.dogs, found.sitter, found.owner, found.start_date, found.sitter_phone_number,
      found.sitter_email, found.owner_phone_number, found.owner_email);

    const result = lokiReviewsPersistenceGateway.update(foundReview);

    assert.deepEqual(result, foundReview);
  });

  it("can findBySitterEmail", async () => {
    const review = new Review(1, new URL("http://sitterimage"), new Date(), "text", new URL("http://ownerimage"),
      "rover", "sitter", "owner", new Date(), "sitterPhone", "sitterEmail", "ownerPhone", "ownerEmail");

    lokiReviewsPersistenceGateway.insert(review);

    const found: LokiReview = lokiReviewsPersistenceGateway.findBySitterEmail("sitterEmail")[0];

    assert.deepEqual(found, review);
  });

  it("can getAll few", () => {
    const found: IReview[] = lokiReviewsPersistenceGateway.getAll();

    expect(found).to.have.length(3);
  });

  it("can getAll many", () => {
    for (let i = 1; i <= 500; i++) {
      lokiReviewsPersistenceGateway.insert(getReviewMock());
    }
    const found: IReview[] = lokiReviewsPersistenceGateway.getAll();

    expect(found).to.have.length(503);
  });
});
