import * as bcrypt from 'bcrypt';

export class BcryptHelper {
  /**
   * Hashes a password using bcrypt with a salt round of 14
   * @param password The plain text password to hash
   * @returns A promise resolving to the hashed password
   */
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 14);
  }

  /**
   * Validates a password against a hashed password using bcrypt comparison
   * @param ownPassword The plain text password to validate
   * @param password The hashed password to compare against
   * @returns A promise resolving to a boolean indicating whether the passwords match
   */
  static validatePassword(ownPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(ownPassword, password);
  }
}
