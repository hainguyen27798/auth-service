export declare class BcryptHelper {
    static hashPassword(password: string): Promise<string>;
    static validatePassword(ownPassword: string, password: string): Promise<boolean>;
}
