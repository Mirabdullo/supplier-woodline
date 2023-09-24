import { createProductDto } from "../dto/product.dto";
import { HttpExeption } from "../httpExeption/httpExeption";
import { Company } from "../model/company.model";
import { FurnitureType } from "../model/furnitureType.model";
import { Models } from "../model/model.model";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";
import { Warehouse } from "../model/warehouse.model";
import { User } from "../model/user.model";
import { createOrderDto } from "../dto/order.dto";
import { Op, where } from "sequelize";
import { Deals } from "../model/deal.model";
import { Client } from "../model/client.model";

class ProductService {
    private ProductModel: typeof Product = Product;
    private Warehouse: typeof Warehouse = Warehouse;
    private User: typeof User = User;
    private Models: typeof Models = Models;
    private Order: typeof Order = Order;
    private Company: typeof Company = Company;
    private Client: typeof Client = Client;

    public async getProduct(id: string, status: string, page: number, limit: number) {
        const user = await this.User.findByPk(id);

        const offset = (page - 1) * limit;

        let options = ["NEW", "ACTIVE", "DELIVERED"];
        if (!options.includes(status)) {
            throw new HttpExeption(403, "Status invalid");
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
                    model: Order,
                    as: "order",
                    attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status"],
                    include: [
                        {
                            model: Models,
                            attributes: ["name", "price", "sale", "code"],
                            include: [
                                {
                                    model: FurnitureType,
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

    public async search(
        id: string,
        page: number,
        limit: number,
        search?: string,
        status?: string,
        name?: string,
        type?: string,
        startDate?: Date,
        endDate?: Date,
        order?: string
    ) {
        const user = await this.User.findByPk(id);
        const offset = (page - 1) * limit;
        let options = {};
        let optionStatus = {};
        let optionName = {};
        let optionType = {};

        let orderBy: string;
        if (order && (order === "ASC" || order === "DESC")) {
            orderBy = order;
        } else {
            orderBy = "ASC";
        }
        let dateOptions: any = {};

        if (search) {
            options = {
                [Op.or]: [
                    { order_id: { [Op.iLike]: `%${search}%` } },
                    { "$model.name$": { [Op.iLike]: `%${search}%` } },
                    { tissue: { [Op.iLike]: `%${search}%` } },
                ],
            };
        }

        if (type) {
            optionType = {
                cathegory: type === "склад" ? "продажa со склада" : "заказ",
            };
        }
        let statusArray = ["ACCEPTED", "REJECTED", "ACTIVE", "NEW", "DELIVERED", "SOLD"];
        if (status) {
            if (statusArray.includes(status)) {
                if (status === "DELIVERED") {
                    optionStatus = {
                        status: { [Op.in]: ["DELIVERED", "TRANSFERED"] },
                    };
                } else if (status === "ACCEPTED") {
                    optionStatus = {
                        status: { [Op.in]: ["ACCEPTED", "CREATED"] },
                    };
                } else if (status === "ACTIVE") {
                    optionStatus = {
                        status: { [Op.in]: ["ACTIVE", "SOLD_AND_CHECKED"] },
                    };
                } else {
                    optionStatus = {
                        status: status,
                    };
                }
            }
        }

        if (name) {
            optionName = {
                "$model.name$": name,
            };
        }

        let dateO: any = {};
        if (startDate && !endDate) {
            dateOptions.startDate = new Date(startDate);
            dateOptions.endDate = new Date();
            dateO.createdAt = {
                [Op.between]: [new Date(startDate), new Date()],
            };
        } else if (startDate && endDate) {
            dateOptions.startDate = new Date(startDate);
            dateOptions.endDate = new Date(endDate);
            dateO.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        } else if (!startDate && endDate) {
            let date = new Date(endDate);
            dateOptions.startDate = new Date(date.setDate(date.getDate() - 30));
            dateOptions.endDate = new Date(endDate);
            dateO.createdAt = {
                [Op.between]: [new Date(date.setDate(date.getDate() - 30)), new Date(endDate)],
            };
        } else {
            dateOptions;
        }

        const { count, rows: products } = await Order.findAndCountAll({
            where: {
                ...options,
                ...optionStatus,
                ...optionName,
                ...optionType,
                ...dateO,
                "$model.company_id$": user.comp_id,
                is_active: true,
            },
            attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status"],
            include: [
                {
                    model: Models,
                    attributes: ["name", "price", "sale", "code"],
                    include: [
                        {
                            model: FurnitureType,
                            attributes: ["name"],
                        },
                    ],
                },
                {
                    model: Deals,
                    attributes: ["id", "delivery_date", "rest"],
                    include: [
                        {
                            model: User,
                            attributes: ["id", "name", "phone"]
                        },
                        {
                            model: this.Client,
                            attributes: ["name", "phone"]
                        }
                    ]
                },
            ],
            offset,
            limit,
            order: [["deal", "delivery_date", orderBy]],
        });

        return { totalAmount: count, products };
    }

    public async transferProduct(id: string, warehouseId: string) {
        const product = await this.ProductModel.findOne({
            where: { order_id: id, is_active: true },
        });
        if (!product) {
            throw new HttpExeption(404, "Product not found");
        }

        const warehouse = await Warehouse.findByPk(warehouseId);

        if (!warehouse) {
            throw new HttpExeption(404, "Warehouse not found");
        }

        await this.Order.update(
            {
                cathegory: "продажa с витрины",
                status: "TRANSFERED",
            },
            { where: { id: id } }
        );

        product.is_active = false;
        await product.save();

        await this.ProductModel.create({
            warehouse_id: warehouseId,
            order_id: id,
            is_active: true,
        });
        return "Product transfered successfully";
    }

    public async postProduct(id: string, data: createOrderDto) {
        const user = await this.User.findByPk(id);
        let warehouse = await this.Warehouse.findOne({ where: { company_id: user.comp_id } });
        if (!warehouse) {
            const company = await this.Company.findOne({ where: { id: user.comp_id } });
            if (!company) {
                throw new HttpExeption(404, "Company not found");
            }
            console.log("create warehouse");
            warehouse = await this.Warehouse.create({
                name: company.name + " склад",
                company_id: company.id,
                admin: user.id,
                type: "b2b склад"
            });
        }

        const model = await this.Models.findAll({ where: { company_id: user.comp_id } });
        const model_ids = model.map((mod) => mod.id);

        if (!model_ids.includes(data.model_id)) {
            throw new HttpExeption(404, "Invalid model");
        }

        const order = await this.Order.create({
            status: "CREATED",
            cathegory: "продажa со склада",
            ...data,
        });

        return await this.ProductModel.create({
            warehouse_id: warehouse.id,
            order_id: order.id,
            is_active: true,
        });
    }
}

export default ProductService;
