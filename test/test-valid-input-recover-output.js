const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.join(__dirname, "valid-recover-output"));

const { validateXMLrecoverOutput } = require("..");

describe("Test valid input", function () {
  for (const file of files) {
    it(file, function () {
      return validateXMLrecoverOutput(
        fs.readFileSync(path.join(__dirname, "valid", file)),
        path.join(__dirname, "test_output", "recovered_output_" + file)
      );
    });
  }
});
