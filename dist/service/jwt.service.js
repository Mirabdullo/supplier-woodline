"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const PRIVATE_KEY = process.env.PRIVATE_KEY || "JUDAYAM_MAXFIY_BO`LSA_EDI";
function signJWT(payload) {
    const token = jsonwebtoken_1.default.sign(payload, PRIVATE_KEY);
    return token;
}
exports.signJWT = signJWT;
function verifyJWT(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, PRIVATE_KEY);
        return decoded;
    }
    catch (err) {
        console.log(err.message);
        return null;
    }
}
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.service.js.map