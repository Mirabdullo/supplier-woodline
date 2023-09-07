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
exports.Product = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const warehouse_model_1 = require("./warehouse.model");
const order_model_1 = require("./order.model");
let Product = exports.Product = class Product extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => order_model_1.Order),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "order_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => order_model_1.Order),
    __metadata("design:type", order_model_1.Order)
], Product.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => warehouse_model_1.Warehouse),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "warehouse_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => warehouse_model_1.Warehouse),
    __metadata("design:type", warehouse_model_1.Warehouse)
], Product.prototype, "warehouse", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_copied", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_active", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: "storeproducts" })
], Product);
//# sourceMappingURL=product.model.js.map