"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeGeneratorHelper = codeGeneratorHelper;
const crypto_1 = require("crypto");
function codeGeneratorHelper() {
    return crypto_1.default.randomBytes(48).toString('hex');
}
//# sourceMappingURL=code-generator.helper.js.map