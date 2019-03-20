const { spawnSync } = require("child_process");

/**
 * This script should be run whenever the package is installed.
 *
 * It verifies that xmllint is present and can be used to perform the
 * xml validation.
 */
if (spawnSync("xmllint --version", { shell: true }).status !== 0) {
  throw new Error(
    "Failed to validate xmllint installation. All xml validations will fail."
  );
} else {
  console.log("xmllint has been located. Ready to validate xml.");
}
