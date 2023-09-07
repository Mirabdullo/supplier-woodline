"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const furnitureType_model_1 = require("../model/furnitureType.model");
const model_model_1 = require("../model/model.model");
const user_model_1 = require("../model/user.model");
class ModelService {
    constructor() {
        this.Models = model_model_1.Models;
        this.UserModel = user_model_1.User;
    }
    async getModel(id) {
        const user = await this.UserModel.findByPk(id);
        return await this.Models.findAll({
            where: { company_id: user.comp_id },
            attributes: ["name", "code", "price", "sale"],
            include: {
                model: furnitureType_model_1.FurnitureType,
                attributes: ["id", "name"]
            }
        });
    }
}
exports.default = ModelService;
//# sourceMappingURL=model.service.js.map