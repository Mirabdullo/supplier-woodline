"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || "Internal server error";
        res.status(status).json({ message });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map