"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpExeption_1 = require("../httpExeption/httpExeption");
const company_model_1 = require("../model/company.model");
const user_model_1 = require("../model/user.model");
const jwt_service_1 = require("./jwt.service");
class UserService {
    constructor() {
        this.UserModel = user_model_1.User;
        this.CompanyModel = company_model_1.Company;
    }
    async getUsers() {
        return await this.UserModel.findAll();
    }
    async create(data) {
        const condidate = await this.UserModel.findOne({ where: { phone: data.phone } });
        if (condidate) {
            throw new httpExeption_1.HttpExeption(400, "This phone number already registireted");
        }
        const company = await this.CompanyModel.findOne({ where: { id: data.comp_id } });
        if (!company)
            throw new httpExeption_1.HttpExeption(400, "Company not found");
        const user = await this.UserModel.create(data);
        return user;
    }
    async login(userData) {
        const { phone, password } = userData;
        const user = await this.UserModel.findOne({ where: { phone, password } });
        if (!user) {
            throw new httpExeption_1.HttpExeption(404, "User not found");
        }
        const token = await (0, jwt_service_1.signJWT)({ id: user.id, role: user.role });
        return {
            token,
            company_id: user.company_id,
            role: user.role,
            name: user === null || user === void 0 ? void 0 : user.name,
        };
    }
}
exports.default = UserService;
//# sourceMappingURL=user.service.js.map