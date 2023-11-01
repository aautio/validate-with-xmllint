import { spawn } from 'child_process';

export type Options = {
    nonet?: boolean;
    noout?: boolean;
};

/**
 * xmllint should not write anything to stdout nor stderr when validating.
 *
 * Thus, any output is considered an error and will reject the promise.
 *
 * The exit code of xmllint informs us whether the xml was valid or not
 */
const executeXmlLint = (
    input: string | Buffer,
    command: string,
    options: Options = {},
): Promise<void> => {
    const {
        nonet = true,
        noout = true,
    } = options;
    let fullCommand = command;

    if (nonet) {
        fullCommand += ' --nonet';
    }

    if (noout) {
        fullCommand += ' --noout';
    }

    return new Promise((resolve, reject) => {
        const xmllint = spawn(`${fullCommand} -`, { shell: true });

        // stdout and stderr are both captured to be made available if the promise rejects
        let output = '';
        xmllint.stdout.on('data', chunk => (output += chunk.toString()));
        xmllint.stderr.on('data', chunk => (output += chunk.toString()));

        // Any errors cause a rejection
        xmllint.on('error', reject);

        xmllint.on('close', code => {
            if (code === 0) {
                return resolve();
            }
            return reject(
                new Error(
                    `xmllint exited with code ${code} when executed with ${command}:\n${output}`,
                ),
            );
        });

        // pipe input to process
        xmllint.stdin.end(input);
    });
};

/**
 * Validate XML without any DTD or schema.
 *
 * @param input XML
 */
export const validateXML = (input: string | Buffer, options?: Options): Promise<void> => (
    executeXmlLint(input, 'xmllint', options)
);

/**
 * Validate XML with DTD.
 *
 * @param input XML
 */
export const validateXMLWithDTD = (input: string | Buffer, options?: Options): Promise<void> => (
    executeXmlLint(input, 'xmllint --valid', options)
);

/**
 * Validate XML with the provided XML schema file.
 * @param input XML
 * @param xsdfile Path to XSD
 */
export const validateXMLWithXSD = (
    input: string | Buffer,
    xsdfile: string | Buffer,
    options?: Options,
): Promise<void> => (
    executeXmlLint(input, `xmllint --schema ${xsdfile}`, options)
);
