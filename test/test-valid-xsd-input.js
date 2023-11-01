const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, 'valid-xsd'));

const { validateXMLWithXSD } = require('..');

describe("Test input with valid xsd's", () => {
    for (const file of files) {
        it(file, () => validateXMLWithXSD(
            fs.readFileSync(path.join(__dirname, 'valid-xsd', file)),
            path.join(__dirname, 'xsds', 'valid-xsd.xsd'),
        ));
    }
});
