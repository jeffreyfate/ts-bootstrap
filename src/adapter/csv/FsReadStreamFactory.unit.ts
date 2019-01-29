import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { FileName } from "../../entity/FileName";
import { FsReadStreamFactory } from "./FsReadStreamFactory";

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("FsReadStreamFactory", () => {
  it("can read", async () => {
    const result = new FsReadStreamFactory().read(new FileName("testcanread.csv"));
    expect(result).to.be.an("object");
  });
});
