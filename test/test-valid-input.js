const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.join(__dirname, 'valid'));

const { validateXML } = require('..');

describe('Test valid input', () => {
    for (const file of files) {
        const filePath = fs.readFileSync(path.join(__dirname, 'valid', file));
        it(file, () => validateXML(filePath));

        it(file, () => validateXML(filePath, {
            nonet: false,
            noout: false,
        }));
    }
});
