const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.join(__dirname, "valid-dtd"));

const { validateXMLWithDTD } = require("..");

describe("Test input with valid dtd's", function() {
  for (const file of files) {
    it(file, function() {
      return validateXMLWithDTD(
        fs.readFileSync(path.join(__dirname, "valid-dtd", file))
      );
    });
  }
});
