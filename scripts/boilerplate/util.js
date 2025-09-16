/**
 * Helper method to convert LF line endings to CRLF line endings
 * @remarks This is needed to avoid prettier formatting issues on generation of the files
 * @param text The text to convert
 * @returns The converted text
 */
const withCRLF = text => text.replace(/\n/g, "\r\n");

module.exports = { withCRLF };
