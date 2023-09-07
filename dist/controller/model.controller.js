"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_service_1 = __importDefault(require("../service/model.service"));
const httpExeption_1 = require("../httpExeption/httpExeption");
const jwt_service_1 = require("../service/jwt.service");
class ModelController {
    constructor() {
        this.modelService = new model_service_1.default();
        this.GET = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const decode = (0, jwt_service_1.verifyJWT)(token);
                res.json(await this.modelService.getModel(decode.id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
    }
}
exports.default = ModelController;
//# sourceMappingURL=model.controller.js.map