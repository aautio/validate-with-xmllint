const fs = require('fs');
const path = require('path');

const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));

const files = fs.readdirSync(path.join(__dirname, 'invalid'));

const { validateXML } = require('..');

describe('Test invalid input', () => {
    for (const file of files) {
        it(file, () => expect(
            validateXML(fs.readFileSync(path.join(__dirname, 'invalid', file))),
        ).to.be.eventually.rejected);
    }
});
