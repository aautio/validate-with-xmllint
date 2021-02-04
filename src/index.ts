import { spawn } from "child_process";

/**
 * xmllint should not write anything to stdout nor stderr when validating.
 *
 * Thus any output is considered an error and will reject the promise.
 *
 * The exit code of xmllint informs us whether the xml was valid or not
 */
const exec_xmllint = (
  input: string | Buffer,
  command: string
): Promise<void | string> =>
  new Promise((resolve, reject) => {
    const xmllint = spawn(command, { shell: true });

    // stdout and stderr are both captured to be made available if the promise rejects
    let output = "";
    xmllint.stdout.on("data", (chunk) => (output += chunk.toString()));
    xmllint.stderr.on("data", (chunk) => (output += chunk.toString()));

    // Any errors cause a rejection
    xmllint.on("error", reject);

    xmllint.on("close", (code) => {
      if (code === 0) {
        return resolve(output);
      }
      return reject(
        new Error(
          `xmllint exited with code ${code} when executed with ${command}:\n${output}`
        )
      );
    });

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
 * Validate XML without any DTD or schema. Return Recovered XML.
 *
 * @param input XML
 */
export const validateXMLrecover = (
  input: string | Buffer,
  output: string | Buffer
) => exec_xmllint(input, `xmllint --nonet --recover -`);

/**
 * Validate XML without any DTD or schema. Output Recovered XML to file.
 *
 * @param input XML
 * @param output File path to store output
 */
export const validateXMLrecoverOutput = (
  input: string | Buffer,
  output: string | Buffer
) => exec_xmllint(input, `xmllint --nonet --recover --output ${output} -`);

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
