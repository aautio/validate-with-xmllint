Wrapper for `xmllint`. Makes it easy to validate XML against XML Schemas and DTDs.

## Features

- Validate schemaless XML file 👉 `function validateXML(input: string | Buffer): Promise<void>`
- Validate with DTDs 👉 `function validateXMLWithDTD(input: string | Buffer): Promise<void>`
- Validate with XML Schemas (XSD) 👉 `function validateXMLWithXSD(input: string | Buffer, xsdfile: string | Buffer): Promise<void>`
- Written in TypeScript
- Tests with good coverage included
- Zero NPM dependencies but requires xmllint to be installed

## Usage

```
TODO
```

## FAQ

> How to install `xmllint`?

You might already have it. Execute `xmllint --version` and see what it prints out.

On Debian distros look up `libxml2-utils`, on RedHat `libxml2`. A recent version of `xmllint` should be bundled by default on MacOS.
