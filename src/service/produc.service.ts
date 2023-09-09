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
import { Op } from "sequelize";
import { Deals } from "../model/deal.model";

class ProductService {
    private ProductModel: typeof Product = Product;
    private Warehouse: typeof Warehouse = Warehouse;
    private User: typeof User = User;
    private Models: typeof Models = Models;
    private Order: typeof Order = Order;

    public async getNewProduct(id: string, page: number, limit: number) {
        const user = await this.User.findByPk(id);

        const offset = (page - 1) * limit;

        return await Order.findAll({
            where: {
                status: "NEW",
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
                },
            ],
            offset,
            limit,
            order: [["createdAt", "ASC"]],
        });
    }

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

    public async search(id: string, page: number, limit: number, search?: string, status?: string, name?:string, type?:string, startDate?: Date, endDate?: Date) {
        const user = await this.User.findByPk(id);
        console.log(status);
        const offset = (page - 1) * limit;
        let options = {};
        let optionStatus = {}
        let optionName = {}
        let optionType = {}

        let dateOptions: any = {}

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
                cathegory: type === "склад" ? "продажa со склада" : "заказ"
            }
        }
        let statusArray = ["ACCEPTED", "REJECTED", "ACTIVE", "NEW", "DELIVERED"]
        if (status) {
            if (statusArray.includes(status)) {
                if (status === "DELIVERED") {
                    optionStatus = {
                        status: {[Op.in]: ["DELIVERED", "TRANSFERED"]}
                    }
                } else if (status === "NEW") {
                    optionStatus = {
                        status: {[Op.in]: ["NEW", "CREATED"]}
                    }
                } else if (status === "SOLD") {
                    optionStatus = {
                        status: {[Op.in]: ["SOLD", "SOLD_AND_CHECKED"]}
                    }
                } else {
                    optionStatus = {
                        status: status
                    }
                }
            }
        }

        if (name) {
            optionName = {
                "$model.name$": name
            }
        }
        
        let dateO: any = {}
        if (startDate && !endDate) {
            dateOptions.startDate = new Date(startDate)
            dateOptions.endDate = new Date()
            dateO.createdAt = {
                [Op.between]: [new Date(startDate), new Date()]
            }
        } else if (startDate && endDate) { 
            dateOptions.startDate = new Date(startDate)
            dateOptions.endDate = new Date(endDate)
            dateO.createdAt = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            }
        } else if (!startDate && endDate) {
            let date = new Date(endDate)
            dateOptions.startDate = new Date(date.setDate(date.getDate() - 30))
            dateOptions.endDate = new Date(endDate)
            dateO.createdAt = {
                [Op.between]: [new Date(date.setDate(date.getDate() - 30)), new Date(endDate)]
            }
        } else {
            dateOptions
        }
        console.log(optionStatus);
       
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
                },
            ],
            offset,
            limit,
            order: [["createdAt", "ASC"]],
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
        const warehouse = await this.Warehouse.findOne({ where: { company_id: user.comp_id } });
        if (!warehouse) {
            throw new HttpExeption(404, "Warehouse not found");
        }

        const model = await this.Models.findAll({ where: { company_id: user.comp_id } });
        const model_ids = model.map((mod) => mod.id);

        if (!model_ids.includes(data.model_id)) {
            throw new HttpExeption(404, "Invalid model");
        }

        const order = await this.Order.create({
            status: "CREATED",
            cathegory: "продажa со склада",
            ...data
        });

        return await this.ProductModel.create({
            warehouse_id: warehouse.id,
            order_id: order.id,
            is_active: true,
        });
    }
}

export default ProductService;
