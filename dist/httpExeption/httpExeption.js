"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExeption = void 0;
class HttpExeption extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpExeption = HttpExeption;
//# sourceMappingURL=httpExeption.js.map