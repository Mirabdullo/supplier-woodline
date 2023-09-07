"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.storekeeper = exports.producer = void 0;
const httpExeption_1 = require("../httpExeption/httpExeption");
const jwt_service_1 = require("../service/jwt.service");
const user_model_1 = require("../model/user.model");
const producer = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(new httpExeption_1.HttpExeption(401, "Token not found"));
        }
        const decode = (0, jwt_service_1.verifyJWT)(token.split(" ")[1]);
        console.log(decode);
        if (!decode) {
            return next(new httpExeption_1.HttpExeption(401, "Invalid token"));
        }
        const user = await user_model_1.User.findOne({
            where: { id: decode.id, role: decode.role, is_active: true }
        });
        if (!user) {
            return next(new httpExeption_1.HttpExeption(401, "You are not allowed to access"));
        }
        if (decode.role !== "PRODUCER") {
            return next(new httpExeption_1.HttpExeption(401, "You are not authorized to access this"));
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(new httpExeption_1.HttpExeption(error.status, error.message));
    }
};
exports.producer = producer;
const storekeeper = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(new httpExeption_1.HttpExeption(401, "Token not found"));
        }
        const decode = (0, jwt_service_1.verifyJWT)(token.split(" ")[1]);
        console.log(decode);
        if (!decode) {
            return next(new httpExeption_1.HttpExeption(401, "Invalid token"));
        }
        const user = await user_model_1.User.findOne({
            where: { id: decode.id, role: decode.role, is_active: true }
        });
        if (!user) {
            return next(new httpExeption_1.HttpExeption(401, "You are not allowed to access"));
        }
        if (decode.role !== "STOREKEEPER") {
            return next(new httpExeption_1.HttpExeption(401, "You are not allowed to access"));
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(new httpExeption_1.HttpExeption(error.status, error.message));
    }
};
exports.storekeeper = storekeeper;
const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(new httpExeption_1.HttpExeption(401, "Token not found"));
        }
        const decode = (0, jwt_service_1.verifyJWT)(token.split(" ")[1]);
        console.log(decode);
        if (!decode) {
            return next(new httpExeption_1.HttpExeption(401, "Invalid token"));
        }
        const user = await user_model_1.User.findOne({
            where: { id: decode.id, role: decode.role, is_active: true }
        });
        if (!user) {
            return next(new httpExeption_1.HttpExeption(401, "You are not allowed to access"));
        }
        let roles = ["STOREKEEPER", "PRODUCER"];
        if (!roles.includes(decode.role)) {
            return next(new httpExeption_1.HttpExeption(401, "You are not allowed to access"));
        }
        next();
    }
    catch (error) {
        console.log(error);
        next(new httpExeption_1.HttpExeption(error.status, error.message));
    }
};
exports.middleware = middleware;
//# sourceMappingURL=auth.middleware.js.map