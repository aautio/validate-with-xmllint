# validate-with-xmllint

[![npm package][npm-badge]][npm]

Wrapper for `xmllint`. Easy validation of XML. XML Schemas and DTDs supported. Zero dependencies.

## Features

- Validate schemaless XML file 👉 `function validateXML(input: string | Buffer): Promise<void>`
- Validate with DTDs 👉 `function validateXMLWithDTD(input: string | Buffer): Promise<void>`
- Validate with XML Schemas (XSD) 👉 `function validateXMLWithXSD(input: string | Buffer, xsdfile: string | Buffer): Promise<void>`
- Written in TypeScript
- Tests with good coverage included
- Zero NPM dependencies
- Availability of `xmllint` is verified during installation time
- No network connections used during validations

## Usage

#### Importing functions

```js
const {
  validateXML,
  validateXMLWithDTD,
  validateXMLWithXSD
} = require("validate-with-xmllint");
```

#### Demos of passing validations

All the examples below return promises which will eventually _resolve_.

```js
validateXML("<hello>world!</hello>");
validateXML("<tiny/>");

/**
 * All referenced DTD's must be available locally as `xmllint`
 * is invoked with `--nonet` which prevents network connections
 **/
validateXMLWithDTD(
  `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE root SYSTEM "./test/dtds/valid-dtd.dtd">
    <root>
        <body/>
        <body/>
    </root>`
);

/**
 * Path to XSD Schema file must be provided with the document
 **/
validateXMLWithXSD(
  `<?xml version="1.0"?>
    <root>
        <text>
        DEMO
        </text>
        <body>
            <name>foo</name>
        </body>
    </root>`,
  "./test/xsds/valid-xsd.xsd"
);
```

#### Demos of failing validations

All the examples below return promises which will eventually _reject_ with the output from `xmllint`.

```js
validateXML("<open_tag_only>");
validateXML("garbage");

validateXMLWithDTD(
  `<?xml version="1.0" encoding="utf-8"?>
    <!DOCTYPE root SYSTEM "./test/dtds/valid-dtd.dtd">
    <this>
      Not allowed by the dtd!
    </this>`
);

validateXMLWithXSD(
  `<?xml version="1.0"?>
    <root>
        <something_unexpected_here/>
    </root>`,
  "./test/xsds/valid-xsd.xsd"
);
```

See more demos within the tests.

## FAQ

> How to install `xmllint`?

You might already have it. Execute `xmllint --version` and see what it prints out.

On Debian distros look up `libxml2-utils`, on RedHat `libxml2`. A recent version of `xmllint` should be bundled by default on MacOS.

This pacakge runs a postinstall script to verify that you have `xmllint` available.

> How to see the actual errors in my XML?

The promise is rejected with the error output from `xmllint`. The error contains all the available details. Expect to see something like this:

```
Error: xmllint exited with code 3 when executed with xmllint --schema /Users/aautio/foobar/validate-with-xmllint/test/xsds/valid-xsd.xsd --noout --nonet -:
-:2: element root: Schemas validity error : Element 'root': Missing child element(s). Expected is ( body ).
- fails to validate
```

[npm-badge]: https://img.shields.io/npm/v/validate-with-xmllint.svg
[npm]: https://www.npmjs.org/package/validate-with-xmllint
