import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { IStringAny } from "./../../entity-boundary/IStringAny";
import { FileName } from "./../../entity/FileName";
import { CsvParseReadGateway } from "./CsvParseReadGateway";

chai.use(chaiAsPromised);

const assert = chai.assert;

import { Container } from "inversify";
import { TYPE } from "../../types/types";
import { IReadGateway } from "./../../entity-boundary/IReadGateway";
import { CsvContainer } from "./csv.config";

interface ITestType extends IStringAny {
  readonly test1: string;
  readonly test2: string;
}

describe("CsvParseReadGateway", () => {
  let filename: FileName;

  const csvParseReadGatewayContainer = new Container();
  csvParseReadGatewayContainer.bind<IReadGateway>(TYPE.IReadGateway)
      .to(CsvParseReadGateway);

  const testContainer = Container.merge(CsvContainer, csvParseReadGatewayContainer);

  const readGateway = testContainer.get<IReadGateway>(TYPE.IReadGateway);

  beforeEach(() => {
    testContainer.snapshot();
  });

  afterEach(() => {
    testContainer.restore();
  });

  it("can read", async () => {
    filename = new FileName("testcanread.csv");
    const result = await readGateway.read<ITestType>(filename);
    assert.deepEqual(result, [{test1: "string1", test2: "string2"}]);
  });

  it("can error", async () => {
    filename = new FileName("testcanerror.csv");
    assert.isRejected(readGateway.read<ITestType>(filename));
  });
});
