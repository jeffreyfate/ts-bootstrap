import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { URL } from "url";
import { IStringAny } from "../../entity-boundary/IStringAny";
import { LokiSittersPersistenceGateway } from "./LokiSittersPersistenceGateway";

chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;

import { Container } from "inversify";
import { ISitter } from "../../entity-boundary/ISitter";
import { getSitterMock } from "../../entity-boundary/ISitter.mock";
import { Sitter } from "../../entity/Sitter";
import { TYPE } from "../../types/types";
import { ILokiSittersPersistenceGateway } from "./ILokiSittersPersistenceGateway";
import { LokiContainer } from "./loki.config";
import { LokiSitter } from "./LokiSitter";

interface ITestType extends IStringAny {
  readonly test1: string;
  readonly test2: string;
}

describe("LokiSittersPeristenceGateway", () => {
  const lokiSittersPersistenceGatewayContainer = new Container();
  lokiSittersPersistenceGatewayContainer.bind<ILokiSittersPersistenceGateway>(TYPE.ILokiSittersPersistenceGateway)
      .to(LokiSittersPersistenceGateway);

  const testContainer = Container.merge(LokiContainer, lokiSittersPersistenceGatewayContainer);
  testContainer.unbind(TYPE.LokiSitters);
  testContainer.bind<string>(TYPE.LokiSitters)
      .toConstantValue("LokiSittersPeristenceGateway.integrated");

  const lokiSittersPersistenceGateway = testContainer.get<ILokiSittersPersistenceGateway>(
      TYPE.ILokiSittersPersistenceGateway);

  const sitterOverall1 = new Sitter(new URL("http://sitterimage"), "sitter", "sitterPhone", "sitterEmail", 1, 1, 1);
  const sitterOverall2 = new Sitter(new URL("http://sitterimage"), "sitter", "sitterPhone", "sitterEmail", 1, 1, 2);

  beforeEach(() => {
    testContainer.snapshot();
  });

  afterEach(() => {
    testContainer.restore();
  });

  it("can insert", () => {
    const result = lokiSittersPersistenceGateway.insert(sitterOverall1);

    assert.deepEqual(result, sitterOverall1);
  });

  it("can update", () => {
    const found: LokiSitter = lokiSittersPersistenceGateway.findLokiSittersByEmail("sitterEmail")[0];

    const foundSitter = new LokiSitter(found.$loki, found.meta, found.sitter_image, found.sitter,
      found.sitter_phone_number, found.sitter_email, found.sitter_score, found.ratings_score, 2);

    const result = lokiSittersPersistenceGateway.update(foundSitter);

    assert.deepEqual(result, foundSitter);
  });

  it("can findBySitterEmail", () => {
    const found: ISitter = lokiSittersPersistenceGateway.findBySitterEmail("sitterEmail")[0];

    assert.deepEqual(found, sitterOverall2);
  });

  it("can findLokiSittersByEmail", () => {
    const found: LokiSitter = lokiSittersPersistenceGateway.findLokiSittersByEmail("sitterEmail")[0];

    assert.deepEqual(found, sitterOverall2);
  });

  it("findLokiSittersByEmail not found", () => {
    const found: LokiSitter[] = lokiSittersPersistenceGateway.findLokiSittersByEmail("notfound");

    expect(found).to.have.length(0);
  });

  it("can getAll one", () => {
    const found: ISitter[] = lokiSittersPersistenceGateway.getAll();

    expect(found).to.have.length(1);
  });

  it("can getAll many", () => {
    for (let i = 1; i <= 500; i++) {
      lokiSittersPersistenceGateway.insert(getSitterMock({overall_sitter_rank: i}));
    }
    const found: ISitter[] = lokiSittersPersistenceGateway.getAll();

    expect(found).to.have.length(501);
  });
});
