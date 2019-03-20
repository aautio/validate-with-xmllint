const fs = require("fs");
const path = require("path");

const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-as-promised"));

const files = fs.readdirSync(path.join(__dirname, "invalid-dtd"));

const { validateXMLWithDTD } = require("..");

describe("Test input with invalid dtd's", function() {
  for (const file of files) {
    it(file, function() {
      return expect(
        validateXMLWithDTD(
          fs.readFileSync(path.join(__dirname, "invalid-dtd", file))
        )
      ).to.be.eventually.rejected;
    });
  }
});
