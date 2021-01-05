const fs = require("fs");
const path = require("path");

const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const files = fs.readdirSync(path.join(__dirname, "invalid-recover"));

const { validateXMLrecoverOutput } = require("..");

describe("Test invalid input with --recover --output", function () {
  for (const file of files) {
    it(file, function () {
      return expect(
        validateXMLrecoverOutput(
          fs.readFileSync(path.join(__dirname, "invalid-recover", file)),
          path.join(__dirname, "test_output", "recovered_output_" + file)
        )
      );
    });
  }
});
