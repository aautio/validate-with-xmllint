const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, 'valid-dtd'));

const { validateXMLWithDTD } = require('..');

describe("Test input with valid dtd's", () => {
    for (const file of files) {
        it(file, () => validateXMLWithDTD(
            fs.readFileSync(path.join(__dirname, 'valid-dtd', file)),
        ));
    }
});
