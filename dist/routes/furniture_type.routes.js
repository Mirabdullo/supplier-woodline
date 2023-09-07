"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const furniture_type_controller_1 = __importDefault(require("../controller/furniture_type.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
class FurnitureTypeRoutes {
    constructor() {
        this.path = "/furniture-type";
        this.router = (0, express_1.Router)();
        this.furnitureTypeController = new furniture_type_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_middleware_1.middleware, this.furnitureTypeController.GET);
    }
}
exports.default = FurnitureTypeRoutes;
//# sourceMappingURL=furniture_type.routes.js.map