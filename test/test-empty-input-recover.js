const fs = require("fs");
const path = require("path");

const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const files = fs.readdirSync(path.join(__dirname, "empty-recover"));

const { validateXMLrecover } = require("..");

describe("Test empty input with --recover", function () {
  for (const file of files) {
    it(file, function () {
      return expect(
        validateXMLrecover(
          fs.readFileSync(path.join(__dirname, "empty-recover", file))
        )
      ).to.be.eventually.rejected;
    });
  }
});
