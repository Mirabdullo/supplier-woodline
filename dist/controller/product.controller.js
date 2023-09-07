"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const produc_service_1 = __importDefault(require("../service/produc.service"));
const httpExeption_1 = require("../httpExeption/httpExeption");
const jwt_service_1 = require("../service/jwt.service");
class ProductController {
    constructor() {
        this.productService = new produc_service_1.default();
        this.GET = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const user = (0, jwt_service_1.verifyJWT)(token);
                const page = +req.query.page || 1;
                const limit = +req.query.limit || 10;
                res.json(await this.productService.getNewProduct(user.id, page, limit));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.GET_BY_STATUS = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const user = (0, jwt_service_1.verifyJWT)(token);
                const status = req.query.status;
                const page = +req.query.page || 1;
                const limit = +req.query.limit || 10;
                res.json(await this.productService.getProduct(user.id, status, page, limit));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.ALL = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const user = (0, jwt_service_1.verifyJWT)(token);
                const search = req.query.search;
                const filter = req.query.filter;
                const page = +req.query.page || 1;
                const limit = +req.query.limit || 10;
                const startDate = req.query.startDate;
                const endDate = req.query.endDate;
                res.json(await this.productService.search(user.id, page, limit, search, filter, startDate, endDate));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.TRANSFER = async (req, res, next) => {
            try {
                const id = req.params.id;
                const warehouse = req.body.warehouse_id;
                res.json(await this.productService.transferProduct(id, warehouse));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.POST = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const user = (0, jwt_service_1.verifyJWT)(token);
                const data = req.body;
                res.json(await this.productService.postProduct(user.id, data));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map