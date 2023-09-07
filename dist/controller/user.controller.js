"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
const httpExeption_1 = require("../httpExeption/httpExeption");
class UserController {
    constructor() {
        this.UserService = new user_service_1.default();
        this.GET = async (req, res, next) => {
            try {
                res.json(await this.UserService.getUsers());
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.POST = async (req, res, next) => {
            try {
                const data = req.body;
                res.json(await this.UserService.create(data));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
        this.LOGIN = async (req, res, next) => {
            try {
                const data = req.body;
                res.json(await this.UserService.login(data));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map