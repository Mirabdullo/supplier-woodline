"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const furnitureType_model_1 = require("../model/furnitureType.model");
const model_model_1 = require("../model/model.model");
const user_model_1 = require("../model/user.model");
class FurnitureTypeService {
    constructor() {
        this.TypeModel = furnitureType_model_1.FurnitureType;
        this.UserModel = user_model_1.User;
    }
    async getType(id) {
        const user = await this.UserModel.findByPk(id);
        return await this.TypeModel.findAll({
            attributes: ["id", "name"],
            include: {
                model: model_model_1.Models,
                attributes: ["id", "name", "price", "sale", "code"],
                where: { company_id: user.comp_id }
            }
        });
    }
}
exports.default = FurnitureTypeService;
//# sourceMappingURL=furniture_type.service.js.map