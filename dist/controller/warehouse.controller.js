"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warehouse_service_1 = __importDefault(require("../service/warehouse.service"));
const httpExeption_1 = require("../httpExeption/httpExeption");
const jwt_service_1 = require("../service/jwt.service");
class WarehouseController {
    constructor() {
        this.warehouseService = new warehouse_service_1.default();
        this.GET = async (req, res, next) => {
            try {
                const token = req.headers.authorization.split(" ")[1];
                const user = (0, jwt_service_1.verifyJWT)(token);
                res.json(await this.warehouseService.getWarehouse(user.id));
            }
            catch (error) {
                console.log(error);
                next(new httpExeption_1.HttpExeption(error.status, error.message));
            }
        };
    }
}
exports.default = WarehouseController;
//# sourceMappingURL=warehouse.controller.js.map