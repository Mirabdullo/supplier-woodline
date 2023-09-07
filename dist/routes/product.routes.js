"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controller/product.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
class ProductRoutes {
    constructor() {
        this.path = "/warehouse-product";
        this.router = (0, express_1.Router)();
        this.productController = new product_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // this.router.get(`${this.path}`, producer, this.productController.GET)
        this.router.get(`${this.path}`, auth_middleware_1.producer, this.productController.ALL);
        this.router.get(`${this.path}/by-status`, auth_middleware_1.middleware, this.productController.GET_BY_STATUS);
        this.router.put(`${this.path}/transfer/:id`, auth_middleware_1.producer, this.productController.TRANSFER);
        this.router.post(`${this.path}`, auth_middleware_1.producer, this.productController.POST);
    }
}
exports.default = ProductRoutes;
//# sourceMappingURL=product.routes.js.map