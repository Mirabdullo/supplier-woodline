"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
class UserRouter {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_middleware_1.producer, this.userController.GET);
        this.router.post(`${this.path}/login`, this.userController.LOGIN);
    }
}
exports.default = UserRouter;
//# sourceMappingURL=user.routes.js.map