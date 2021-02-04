const fs = require("fs");
const path = require("path");

const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const files = fs.readdirSync(path.join(__dirname, "invalid-recover"));

const { validateXMLrecover } = require("..");

describe("Test invalid input with --recover", function () {
  for (const file of files) {
    it(file, function () {
      return expect(
        validateXMLrecover(
          fs.readFileSync(path.join(__dirname, "invalid-recover", file))
        )
      ).to.eventually.have.property("output");
    });
    it(file, function () {
      return expect(
        validateXMLrecover(
          fs.readFileSync(path.join(__dirname, "invalid-recover", file))
        )
      ).to.eventually.have.property("error");
    });
  }
});
