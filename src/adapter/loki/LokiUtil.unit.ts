import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as LokiJS from "lokijs";
import { LokiUtil } from "./LokiUtil";

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("LokiUtil", () => {
  describe("stripLokiMeta", () => {
    it("can strip with no other attributes", async () => {
      const lokiObj = {$loki: 1, meta: {created: 1, revision: 1, updated: 1, version: 1}};
      const stripped = LokiUtil.stripLokiMeta(lokiObj);
      expect(JSON.stringify(stripped)).to.eq(JSON.stringify({}));
    });

    it("can strip with other attributes", async () => {
      const lokiObj = {$loki: 1, meta: {created: 1, revision: 1, updated: 1, version: 1}, test: "test"};
      const stripped = LokiUtil.stripLokiMeta(lokiObj);
      expect(JSON.stringify(stripped)).to.eq(JSON.stringify({test: "test"}));
    });
  });
});
