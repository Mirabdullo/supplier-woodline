"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpExeption_1 = require("../httpExeption/httpExeption");
const furnitureType_model_1 = require("../model/furnitureType.model");
const model_model_1 = require("../model/model.model");
const order_model_1 = require("../model/order.model");
const product_model_1 = require("../model/product.model");
const warehouse_model_1 = require("../model/warehouse.model");
const user_model_1 = require("../model/user.model");
const sequelize_1 = require("sequelize");
const deal_model_1 = require("../model/deal.model");
class ProductService {
    constructor() {
        this.ProductModel = product_model_1.Product;
        this.Warehouse = warehouse_model_1.Warehouse;
        this.User = user_model_1.User;
        this.Models = model_model_1.Models;
        this.Order = order_model_1.Order;
    }
    async getNewProduct(id, page, limit) {
        const user = await this.User.findByPk(id);
        const offset = (page - 1) * limit;
        return await order_model_1.Order.findAll({
            where: {
                status: "NEW",
                "$model.company_id$": user.comp_id,
                is_active: true,
            },
            attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status"],
            include: [
                {
                    model: model_model_1.Models,
                    attributes: ["name", "price", "sale", "code"],
                    include: [
                        {
                            model: furnitureType_model_1.FurnitureType,
                            attributes: ["name"],
                        },
                    ],
                },
                {
                    model: deal_model_1.Deals,
                    attributes: ["id", "delivery_date", "rest"],
                },
            ],
            offset,
            limit,
            order: [["createdAt", "ASC"]],
        });
    }
    async getProduct(id, status, page, limit) {
        const user = await this.User.findByPk(id);
        const offset = (page - 1) * limit;
        let options = ["NEW", "ACTIVE", "DELIVERED"];
        if (!options.includes(status)) {
            throw new httpExeption_1.HttpExeption(403, "Status invalid");
        }
        return await this.ProductModel.findAndCountAll({
            where: {
                "$order.status$": status,
                "$order.model.company_id$": user.comp_id,
                is_active: true,
            },
            attributes: ["id"],
            include: [
                {
                    model: order_model_1.Order,
                    as: "order",
                    attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status"],
                    include: [
                        {
                            model: model_model_1.Models,
                            attributes: ["name", "price", "sale", "code"],
                            include: [
                                {
                                    model: furnitureType_model_1.FurnitureType,
                                    attributes: ["name"],
                                },
                            ],
                        },
                    ],
                },
            ],
            offset,
            limit,
            order: [["deletedAt", "DESC"]],
        });
    }
    async search(id, page, limit, search, filter, startDate, endDate) {
        const user = await this.User.findByPk(id);
        const offset = (page - 1) * limit;
        let optionf = {};
        let options = {};
        let dateOptions = {};
        if (search) {
            options = {
                [sequelize_1.Op.or]: [
                    { order_id: { [sequelize_1.Op.iLike]: `%${search}%` } },
                    { "$model.name$": { [sequelize_1.Op.iLike]: `%${search}%` } },
                    { tissue: { [sequelize_1.Op.iLike]: `%${search}%` } },
                ],
            };
        }
        if (filter === "склад") {
            filter = "продажa со склада";
        }
        if (filter) {
            optionf = {
                [sequelize_1.Op.or]: [{ status: filter }, { "$model.name$": filter }, { cathegory: filter }],
            };
        }
        let dateO = {};
        if (startDate && !endDate) {
            dateOptions.startDate = new Date(startDate);
            dateOptions.endDate = new Date();
            dateO.createdAt = {
                [sequelize_1.Op.between]: [new Date(startDate), new Date()]
            };
        }
        else if (startDate && endDate) {
            dateOptions.startDate = new Date(startDate);
            dateOptions.endDate = new Date(endDate);
            dateO.createdAt = {
                [sequelize_1.Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }
        else if (!startDate && endDate) {
            let date = new Date(endDate);
            dateOptions.startDate = new Date(date.setDate(date.getDate() - 30));
            dateOptions.endDate = new Date(endDate);
            dateO.createdAt = {
                [sequelize_1.Op.between]: [new Date(date.setDate(date.getDate() - 30)), new Date(endDate)]
            };
        }
        else {
            dateOptions;
        }
        const { count, rows: products } = await order_model_1.Order.findAndCountAll({
            where: Object.assign(Object.assign({ [sequelize_1.Op.and]: [options, optionf] }, dateO), { "$model.company_id$": user.comp_id, is_active: true }),
            attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status"],
            include: [
                {
                    model: model_model_1.Models,
                    attributes: ["name", "price", "sale", "code"],
                    include: [
                        {
                            model: furnitureType_model_1.FurnitureType,
                            attributes: ["name"],
                        },
                    ],
                },
                {
                    model: deal_model_1.Deals,
                    attributes: ["id", "delivery_date", "rest"],
                },
            ],
            offset,
            limit,
            order: [["createdAt", "ASC"]],
        });
        return { totalAmount: count, products };
    }
    async transferProduct(id, warehouseId) {
        const product = await this.ProductModel.findOne({
            where: { order_id: id },
        });
        if (!product) {
            throw new httpExeption_1.HttpExeption(404, "Product not found");
        }
        const warehouse = await warehouse_model_1.Warehouse.findByPk(warehouseId);
        if (!warehouse) {
            throw new httpExeption_1.HttpExeption(404, "Warehouse not found");
        }
        await this.Order.update({
            status: "TRANSFERED",
        }, { where: { id: id } });
        product.is_active = false;
        await product.save();
        await this.ProductModel.create({
            warehouse_id: warehouseId,
            order_id: id,
            is_active: true,
        });
        return "Product transfered successfully";
    }
    async postProduct(id, data) {
        const user = await this.User.findByPk(id);
        const warehouse = await this.Warehouse.findOne({ where: { company_id: user.comp_id } });
        if (!warehouse) {
            throw new httpExeption_1.HttpExeption(404, "Warehouse not found");
        }
        const model = await this.Models.findAll({ where: { company_id: user.comp_id } });
        const model_ids = model.map((mod) => mod.id);
        if (!model_ids.includes(data.model_id)) {
            throw new httpExeption_1.HttpExeption(404, "Invalid model");
        }
        const order = await this.Order.create(data);
        return await this.ProductModel.create({
            warehouse_id: warehouse.id,
            order_id: order.id,
            is_active: true,
        });
    }
}
exports.default = ProductService;
//# sourceMappingURL=produc.service.js.map