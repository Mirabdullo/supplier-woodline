"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const model_controller_1 = __importDefault(require("../controller/model.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
class ModelRoutes {
    constructor() {
        this.path = "/models";
        this.router = (0, express_1.Router)();
        this.modelController = new model_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_middleware_1.middleware, auth_middleware_1.producer, this.modelController.GET);
    }
}
exports.default = ModelRoutes;
//# sourceMappingURL=model.routes.js.map