import * as Fs from 'fs';
import * as Path from 'path';
import * as Chai from 'chai';
import * as ChaiAsPromised from 'chai-as-promised';

Chai.use(ChaiAsPromised);

const files = Fs.readdirSync(Path.join(__dirname, 'invalid-dtd'));

const { validateXMLWithDTD } = require('..');

describe("Test input with invalid dtd's", () => {
    for (const file of files) {
        it(file, () => Chai.expect(
            validateXMLWithDTD(
                Fs.readFileSync(Path.join(__dirname, 'invalid-dtd', file)),
            ),
        ).to.be.eventually.rejected);
    }
});
