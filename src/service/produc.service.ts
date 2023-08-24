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

class ProductService {
    private ProductModel: typeof Product = Product
    private Warehouse: typeof Warehouse = Warehouse
    private User: typeof User = User
    private Models: typeof Models = Models
    private Order: typeof Order = Order

    public async getNewProduct(id: string) {
        const user = await this.User.findByPk(id)

        return await this.ProductModel.findAll({
            where: {
                '$order.status$': 'NEW',
                '$order.model.company_id$': user.comp_id,
                is_active: true
            },
            include: [
                {
                    model: Order,
                    as: "order",
                    attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status"],
                    include: [
                        {
                            model: Models,
                            attributes: ["name", "price", "cost", "sale", "code"],
                            include: [
                                {
                                    model: FurnitureType,
                                    attributes: ["name"]
                                }
                            ]
                        },

                    ]
                }
            ]
        })
    }


    public async getProduct(id: string, status: string) {
        const user = await this.User.findByPk(id)
        
        let options = ["NEW", "ACTIVE", "DELIVERED"]
        if (!options.includes(status)) {
            throw new HttpExeption(403, "Status invalid")
        }
        return await this.ProductModel.findAll({
            where: {
                '$order.status$': status,
                '$order.model.company_id$': user.comp_id,
                is_active: true
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
                                    attributes: ["name"]
                                }
                            ]
                        },

                    ]
                }
            ]
        })
    }

    public async transferProduct(id: string, warehouseId: string) {
        const product = await this.ProductModel.findOne({
            where: {order_id: id}
        })
        if (!product) {
            throw new HttpExeption(404, "Product not found")
        }

        const warehouse = await Warehouse.findByPk(warehouseId)

        if (!warehouse) {
            throw new HttpExeption(404, "Warehouse not found")
        }

        await this.Order.update({
            status: "TRANSFERED"
        }, {where: {id: id}})
        
        product.is_active = false
        await product.save()

        await this.ProductModel.create({
            warehouse_id: warehouseId,
            order_id: id,
            is_active: true
        })
        return "Product transfered successfully"
    }

    public async postProduct(id: string, data: createOrderDto) { 
        const user = await this.User.findByPk(id)
        const warehouse = await this.Warehouse.findOne({where: {company_id: user.comp_id}})
        if (!warehouse) {
            throw new HttpExeption(404, "Warehouse not found")
        }

        const model = await this.Models.findAll({ where: { company_id: user.comp_id } })
        const model_ids = model.map((mod) => mod.id)

        if (!model_ids.includes(data.model_id)) {
            throw new HttpExeption(404, "Invalid model")
        }

        const order = await this.Order.create(data)

        return await this.ProductModel.create({
            warehouse_id: warehouse.id,
            order_id: order.id,
            is_active: true
        })
    }



}

export default ProductService