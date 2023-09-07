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
exports.Order = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const model_model_1 = require("./model.model");
const deal_model_1 = require("./deal.model");
let Order = exports.Order = class Order extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        primaryKey: true,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Order.prototype, "order_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Order.prototype, "cathegory", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Order.prototype, "tissue", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Order.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], Order.prototype, "cost", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], Order.prototype, "sale", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], Order.prototype, "qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL }),
    __metadata("design:type", Number)
], Order.prototype, "sum", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => deal_model_1.Deals),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID }),
    __metadata("design:type", String)
], Order.prototype, "deal_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => deal_model_1.Deals),
    __metadata("design:type", deal_model_1.Deals)
], Order.prototype, "deal", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Order.prototype, "is_first", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Order.prototype, "copied", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], Order.prototype, "is_active", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", Date)
], Order.prototype, "end_date", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: true }),
    __metadata("design:type", String)
], Order.prototype, "seller_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => model_model_1.Models),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    __metadata("design:type", String)
], Order.prototype, "model_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => model_model_1.Models),
    __metadata("design:type", model_model_1.Models)
], Order.prototype, "model", void 0);
exports.Order = Order = __decorate([
    (0, sequelize_typescript_1.Table)({ timestamps: true, tableName: "orders" })
], Order);
//# sourceMappingURL=order.model.js.map