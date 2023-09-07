"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_service_1 = __importDefault(require("../service/order.service"));
const httpExeption_1 = require("../httpExeption/httpExeption");
const jwt_service_1 = require("../service/jwt.service");
class OrderController {
    constructor() {
        this.orderService = new order_service_1.default();
        this.GET = async (req, res, next) => {
            try {
                res.json(await this.orderService.getOrder());
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.ACCEPT = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const user = (0, jwt_service_1.verifyJWT)(token);
                const id = req.params.id;
                if (!id) {
                    return res.status(404).json("Id not found");
                }
                res.json(await this.orderService.acceptProduct(user.id, id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.REJECT = async (req, res, next) => {
            try {
                const id = req.params.id;
                if (!id) {
                    return res.status(404).json("Id not found");
                }
                res.json(await this.orderService.rejectProduct(id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.ACTIVE = async (req, res, next) => {
            try {
                const id = req.params.id;
                if (!id) {
                    return res.status(404).json("Id not found");
                }
                res.json(await this.orderService.activateProduct(id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.DELIVERED = async (req, res, next) => {
            try {
                const id = req.params.id;
                if (!id) {
                    return res.status(404).json("Id not found");
                }
                res.json(await this.orderService.deliveredProduct(id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.CHECK_ID = async (req, res, next) => {
            try {
                const id = req.params.id;
                res.json(await this.orderService.checkId(id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.GET_ID = async (req, res, next) => {
            try {
                console.log("object");
                res.json(await this.orderService.getId());
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
    }
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map