"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpExeption_1 = require("../httpExeption/httpExeption");
const order_model_1 = require("../model/order.model");
const product_model_1 = require("../model/product.model");
const user_model_1 = require("../model/user.model");
const warehouse_model_1 = require("../model/warehouse.model");
function makeSixDigit(number) {
    const strNumber = number.toString();
    if (strNumber.length < 6) {
        return strNumber.padStart(6, "0");
    }
    return strNumber;
}
function getRandomNumberFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
function generateId(idArray) {
    const digits = 5;
    const maxAttempts = 100;
    let attempts = 0;
    let randomNumber = "0";
    const existingIds = idArray.map((e) => e.order_id);
    const availableStartDigits = [1, 3, 4, 5, 8];
    do {
        const randomStart = getRandomNumberFromArray(availableStartDigits);
        randomNumber = `${randomStart}${Math.floor(Math.random() * Math.pow(10, digits))}`;
        randomNumber = makeSixDigit(randomNumber);
        attempts++;
    } while (existingIds.includes(randomNumber.toString()) && attempts < maxAttempts);
    if (attempts === maxAttempts) {
        return "Error";
    }
    return randomNumber;
}
class OrderService {
    constructor() {
        this.OrderModel = order_model_1.Order;
        this.ProductModel = product_model_1.Product;
        this.UserModel = user_model_1.User;
        this.WarehouseModel = warehouse_model_1.Warehouse;
    }
    async getOrder() {
        return await this.OrderModel.findAll();
    }
    async acceptProduct(userId, id) {
        const user = await this.UserModel.findByPk(userId);
        const warehouse = await this.WarehouseModel.findOne({ where: { company_id: user.comp_id } });
        const product = await this.OrderModel.findOne({ where: { id: id } });
        if (!product) {
            throw new httpExeption_1.HttpExeption(404, "Product not found");
        }
        if (product.status !== "NEW" && product.status !== "REJECTED") {
            throw new httpExeption_1.HttpExeption(403, "Product Already accepted");
        }
        await this.OrderModel.update({
            status: "ACCEPTED"
        }, { where: { id: id } });
        await this.ProductModel.create({
            order_id: id,
            warehouse_id: warehouse.id
        });
        return "Product accepted";
    }
    async rejectProduct(id) {
        const product = await this.OrderModel.findOne({ where: { id: id } });
        if (!product) {
            throw new httpExeption_1.HttpExeption(404, "Product not found");
        }
        if (product.status !== "NEW") {
            throw new httpExeption_1.HttpExeption(403, "Product Already accepted or rejected");
        }
        await this.OrderModel.update({
            status: "REJECTED"
        }, { where: { id: id } });
        return "Product rejected";
    }
    async deliveredProduct(id) {
        const product = await this.OrderModel.findOne({ where: { id: id } });
        if (!product) {
            throw new httpExeption_1.HttpExeption(404, "Product not found");
        }
        if (product.status !== "ACTIVE" && product.status !== "ACCEPTED") {
            throw new httpExeption_1.HttpExeption(403, "Product not active");
        }
        await this.OrderModel.update({
            status: "DELIVERED"
        }, { where: { id: id } });
        return "Product delivered";
    }
    async activateProduct(id) {
        const product = await this.OrderModel.findOne({ where: { id: id } });
        if (!product) {
            throw new httpExeption_1.HttpExeption(404, "Product not found");
        }
        if (product.status !== "ACCEPTED") {
            throw new httpExeption_1.HttpExeption(403, "Product not accepted");
        }
        await this.OrderModel.update({
            status: "ACTIVE"
        }, { where: { id: id } });
        return "Product activated";
    }
    async checkId(id) {
        return await this.OrderModel.findOne({ where: { order_id: id } });
    }
    async getId() {
        const orders = await this.OrderModel.findAll({ attributes: ["order_id"], order: [["createdAt", "DESC"]] });
        return generateId(orders);
    }
}
exports.default = OrderService;
//# sourceMappingURL=order.service.js.map