const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(path.join(__dirname, "valid"));

const { validateXML } = require("..");

describe("Test valid input", function() {
  for (const file of files) {
    const filePath = fs.readFileSync(path.join(__dirname, "valid", file));
    it(file, function() {
      return validateXML(filePath);
    });

    it(file, function() {
      return validateXML(filePath, {
        nonet: false,
        noout: false,
      });
    });
  }
});
