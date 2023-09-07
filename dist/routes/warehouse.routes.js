"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const warehouse_controller_1 = __importDefault(require("../controller/warehouse.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
class WarehouseRoutes {
    constructor() {
        this.path = "/warehouse";
        this.router = (0, express_1.Router)();
        this.warehouseController = new warehouse_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_middleware_1.middleware, this.warehouseController.GET);
    }
}
exports.default = WarehouseRoutes;
//# sourceMappingURL=warehouse.routes.js.map