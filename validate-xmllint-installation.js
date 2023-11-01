const { spawnSync } = require('child_process');

/**
 * This script should be run whenever the package is installed.
 *
 * It verifies that xmllint is present and can be used to perform the
 * xml validation.
 *
 * See FAQ in README.md for xmllint installation instructions.
 */
if (spawnSync('xmllint --version', { shell: true }).status !== 0) {
    const errorMsg = 'Failed to find `xmllint` installation. All xml validations will fail. See FAQ in README.md.';

    console.error(errorMsg);
    throw new Error(errorMsg);
} else {
    console.log('`xmllint` has been located. Ready to validate xml.');
}
