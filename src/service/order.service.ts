import { Op } from "sequelize";
import { HttpExeption } from "../httpExeption/httpExeption";
import { Company } from "../model/company.model";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";
import { User } from "../model/user.model";
import { Warehouse } from "../model/warehouse.model";
import { Models } from "../model/model.model";
import { FurnitureType } from "../model/furnitureType.model";
import { Deals } from "../model/deal.model";

function makeSixDigit(number: any) {
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

function generateId(idArray: { order_id: string }[]): string {
    const digits: number = 5;
    const maxAttempts: number = 100;
    let attempts: number = 0;
    let randomNumber: string = "0";

    const existingIds: string[] = idArray.map((e) => e.order_id);
    const availableStartDigits: number[] = [1, 3, 4, 5, 8];

    do {
        const randomStart: number = getRandomNumberFromArray(availableStartDigits);
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
    private OrderModel: typeof Order = Order;
    private ProductModel: typeof Product = Product;
    private UserModel: typeof User = User;
    private WarehouseModel: typeof Warehouse = Warehouse;
    private CompanyModel: typeof Company = Company;
    private Models: typeof Models = Models;
    private FurnitureType: typeof FurnitureType = FurnitureType;
    private Deals: typeof Deals = Deals;

    public async getOrder(id: string, page: number, limit: number, start?: string, end?: string) {
        const user = await User.findByPk(id);
        let currentDate = new Date();
        const startDate = new Date(start || currentDate.setDate(currentDate.getMonth() - 1));
        const endDate = new Date(end || new Date().getTime());

        const offset = (page - 1) * limit;

        const { count, rows: orders } = await this.OrderModel.findAndCountAll({
            where: {
                status: { [Op.in]: ["DELIVERED", "TRANSFERED"] },
                "$model.company_id$": user.comp_id,
                createdAt: { [Op.between]: [startDate, endDate] },
            },
            attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status", "createdAt"],
            include: [
                {
                    model: this.Models,
                    attributes: ["id", "name", "price", "sale", "code"],
                    include: [
                        {
                            model: this.FurnitureType,
                            attributes: ["id", "name"],
                        },
                    ],
                },
                {
                    model: this.Deals,
                    attributes: ["id", "delivery_date", "rest"],
                    include: [
                        {
                            model: this.UserModel,
                            attributes: ["id", "name", "phone"],
                        },
                    ],
                },
            ],
            offset,
            limit,
            order: [["createdAt", "DESC"]],
        });

        return { totalAmount: count, orders };
    }

    public async changeStatus(id: string, status: string, userId: string) {
        const user = await this.UserModel.findByPk(userId);
        const product = await this.OrderModel.findOne({
            where: { id: id },
        });

        if (!product) {
            throw new HttpExeption(404, "Product not found");
        }

        if (status === "ACTIVE" && product.status === "CREATED") {
            await this.OrderModel.update(
                {
                    status: "ACTIVE",
                },
                { where: { id: id } }
            );
        } else if (
            status === "DELIVERED" &&
            (product.status === "SOLD_AND_CHECKED" || product.status === "ACCEPTED" || product.status === "ACTIVE")
        ) {
            await this.OrderModel.update(
                {
                    status: "DELIVERED",
                },
                { where: { id: id } }
            );
        } else if (status === "REJECTED" && product.status === "REJECTED") {
            throw new HttpExeption(403, "already rejected");
        } else if (status === "REJECTED" && product.status === "NEW") {
            await this.OrderModel.update(
                {
                    status: "REJECTED",
                },
                { where: { id: id } }
            );
        } else if (status === "ACCEPTED" && product.status === "ACCEPTED") {
            throw new HttpExeption(403, "already accepted");
        } else if (status === "ACCEPTED" && (product.status === "NEW" || product.status === "REJECTED" || product.status === "new")) {
            let warehouse = await this.WarehouseModel.findOne({ where: { company_id: user.comp_id } });
            if (!warehouse) {
                const company = await this.CompanyModel.findOne({ where: { id: user.comp_id } });
                if (!company) {
                    throw new HttpExeption(404, "Company not found");
                }
                console.log("create warehouse");
                warehouse = await this.WarehouseModel.create({
                    name: company.name + " склад",
                    company_id: company.id,
                    admin: user.id,
                    type: "b2b склад",
                });
            }

            await this.OrderModel.update(
                {
                    status: "ACCEPTED",
                },
                { where: { id: id } }
            );

            await this.ProductModel.create({
                warehouse_id: warehouse.id,
                order_id: id,
                is_active: true,
            });
        } else if (status === "SOLD_AND_CHECKED" && product.status === "SOLD_AND_CHECKED") {
            throw new HttpExeption(403, "already SOLD_AND_CHECKED");
        } else if (status === "SOLD_AND_CHECKED") {
            if (product.cathegory === "заказ" && product.status === "ACCEPTED") {
                await this.OrderModel.update(
                    {
                        status: "SOLD_AND_CHECKED",
                    },
                    { where: { id: id } }
                );
            } else if (product.cathegory === "продажa со склада" && product.status === "SOLD") {
                await this.OrderModel.update(
                    {
                        status: "SOLD_AND_CHECKED",
                    },
                    { where: { id: id } }
                );
            } else {
                throw new HttpExeption(400, "Product status must be ACCEPTED OR SOLD");
            }
        } else {
            throw new HttpExeption(403, "Invalid status");
        }

        return await this.OrderModel.findByPk(id);
    }

    public async checkId(id: string) {
        return await this.OrderModel.findOne({ where: { order_id: id } });
    }

    public async getId() {
        const orders = await this.OrderModel.findAll({ attributes: ["order_id"], order: [["createdAt", "DESC"]] });
        return generateId(orders);
    }
}

export default OrderService;
