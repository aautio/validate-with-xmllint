const fs = require("fs");
const path = require("path");

const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const files = fs.readdirSync(path.join(__dirname, "empty-recover-output"));

const { validateXMLrecoverOutput } = require("..");

describe("Test empty input with --recover --output", function () {
  for (const file of files) {
    it(file, function () {
      return expect(
        validateXMLrecoverOutput(
          fs.readFileSync(path.join(__dirname, "empty-recover-output", file)),
          path.join(__dirname, "test_output", "recovered_output_" + file)
        )
      ).to.be.eventually.rejected;
    });
  }
});
