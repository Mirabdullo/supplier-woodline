"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controller/order.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
class OrderRoutes {
    constructor() {
        this.path = "/order";
        this.router = (0, express_1.Router)();
        this.orderController = new order_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_middleware_1.middleware, this.orderController.GET);
        this.router.get(`${this.path}/get-id`, auth_middleware_1.middleware, this.orderController.GET_ID);
        this.router.get(`${this.path}/:id`, auth_middleware_1.middleware, this.orderController.CHECK_ID);
        this.router.put(`${this.path}/accepted/:id`, auth_middleware_1.producer, this.orderController.ACCEPT);
        this.router.put(`${this.path}/rejected/:id`, auth_middleware_1.producer, this.orderController.REJECT);
        this.router.put(`${this.path}/delivered/:id`, auth_middleware_1.producer, this.orderController.DELIVERED);
        this.router.put(`${this.path}/activated/:id`, auth_middleware_1.middleware, this.orderController.ACTIVE);
    }
}
exports.default = OrderRoutes;
//# sourceMappingURL=order.routes.js.map