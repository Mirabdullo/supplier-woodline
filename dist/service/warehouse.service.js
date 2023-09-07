"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warehouse_model_1 = require("../model/warehouse.model");
class WarehouseService {
    constructor() {
        this.Warehouse = warehouse_model_1.Warehouse;
    }
    async getWarehouse(id) {
        return await this.Warehouse.findAll({
            where: { type: "витрина" },
            attributes: ["id", "name", "company_id", "admin", "type"]
        });
    }
}
exports.default = WarehouseService;
//# sourceMappingURL=warehouse.service.js.map