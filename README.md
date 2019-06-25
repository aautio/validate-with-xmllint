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

All the examples below return promises which will eventually _reject_.

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

> What are the messages like _"- validates"_ printed to stdout?

`xmllint` writes it to the stdout whenever you validate XML against XSD schemas and it passes. If the XML is not valid, then you'll see actual errors. The messages might be helpful when debugging.

Currently the `validate-with-xmllint` does not provide a way to suppress this output. If you think it is a problem report an issue and I'll provide a fix for it.
