"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const company_model_1 = require("./company.model");
const furnitureType_model_1 = require("./furnitureType.model");
let Models = exports.Models = class Models extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Models.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Models.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", Number)
], Models.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", Number)
], Models.prototype, "sale", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Models.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, defaultValue: true }),
    __metadata("design:type", Boolean)
], Models.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Models.prototype, "company_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_model_1.Company),
    __metadata("design:type", company_model_1.Company)
], Models.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => furnitureType_model_1.FurnitureType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Models.prototype, "type_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => furnitureType_model_1.FurnitureType),
    __metadata("design:type", furnitureType_model_1.FurnitureType)
], Models.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: "NEW" }),
    __metadata("design:type", String)
], Models.prototype, "status", void 0);
exports.Models = Models = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: "models" })
], Models);
//# sourceMappingURL=model.model.js.map