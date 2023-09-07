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
exports.Warehouse = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const company_model_1 = require("./company.model");
const product_model_1 = require("./product.model");
const user_model_1 = require("./user.model");
let Warehouse = exports.Warehouse = class Warehouse extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Warehouse.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Warehouse.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => company_model_1.Company),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Warehouse.prototype, "company_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => company_model_1.Company),
    __metadata("design:type", company_model_1.Company)
], Warehouse.prototype, "company", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Warehouse.prototype, "admin", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User),
    __metadata("design:type", user_model_1.User)
], Warehouse.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, defaultValue: "NEW" }),
    __metadata("design:type", String)
], Warehouse.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false, defaultValue: "склад" }),
    __metadata("design:type", String)
], Warehouse.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, defaultValue: null }),
    __metadata("design:type", String)
], Warehouse.prototype, "deletedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_model_1.Product),
    __metadata("design:type", Array)
], Warehouse.prototype, "products", void 0);
exports.Warehouse = Warehouse = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: "warehouse", paranoid: true })
], Warehouse);
//# sourceMappingURL=warehouse.model.js.map