import crypto from 'crypto';

/**
 * Generates a random hexadecimal code using 48 random bytes.
 * @returns {string} A randomly generated hex-encoded string.
 */
export function codeGeneratorHelper(): string {
  return crypto.randomBytes(48).toString('hex');
}
