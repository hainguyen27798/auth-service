"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptHelper = void 0;
const bcrypt = require("bcrypt");
class BcryptHelper {
    static async hashPassword(password) {
        return await bcrypt.hash(password, 14);
    }
    static validatePassword(ownPassword, password) {
        return bcrypt.compare(ownPassword, password);
    }
}
exports.BcryptHelper = BcryptHelper;
//# sourceMappingURL=bcrypt.helper.js.map