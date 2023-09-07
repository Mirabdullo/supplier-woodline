"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const furniture_type_service_1 = __importDefault(require("../service/furniture_type.service"));
const httpExeption_1 = require("../httpExeption/httpExeption");
const jwt_service_1 = require("../service/jwt.service");
class FurnitureTypeController {
    constructor() {
        this.furnitureService = new furniture_type_service_1.default();
        this.GET = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const decode = (0, jwt_service_1.verifyJWT)(token);
                res.json(await this.furnitureService.getType(decode.id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
    }
}
exports.default = FurnitureTypeController;
//# sourceMappingURL=furniture_type.controller.js.map