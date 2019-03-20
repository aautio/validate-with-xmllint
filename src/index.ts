import { spawn } from "child_process";

/**
 * xmllint should not write anything to stdout nor stderr when validating.
 *
 * Thus any output is considered an error and will reject the promise.
 *
 * The exit code of xmllint informs us whether the xml was valid or not
 */
const exec_xmllint = (input: string | Buffer, command: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const xmllint = spawn(command, { shell: true });

    // Any errors cause a rejection
    xmllint.on("error", reject);

    xmllint.on("close", code => {
      if (code === 0) {
        return resolve();
      }
      return reject(
        new Error(
          `xmllint exited with code ${code} when executed with ${command}`
        )
      );
    });

    // pipe stderr and stdout to be visible in order to print out validation errors
    // TODO: this causes `- validates` to be printed out when there are no errors detected, it should be ignored
    xmllint.stderr.pipe(process.stderr);
    xmllint.stdout.pipe(process.stdout);

    // pipe input to process
    xmllint.stdin.end(input);
  });

/**
 * Validate XML without any DTD or schema.
 *
 * @param input XML
 */
export const validateXML = (input: string | Buffer) =>
  exec_xmllint(input, "xmllint --noout --nonet -");

/**
 * Validate XML with DTD.
 *
 * @param input XML
 */
export const validateXMLWithDTD = (input: string | Buffer) =>
  exec_xmllint(input, "xmllint --valid --noout --nonet -");

/**
 * Validate XML with the provided XML schema file.
 * @param input XML
 * @param xsdfile Path to XSD
 */
export const validateXMLWithXSD = (
  input: string | Buffer,
  xsdfile: string | Buffer
) => exec_xmllint(input, `xmllint --schema ${xsdfile} --noout --nonet -`);
