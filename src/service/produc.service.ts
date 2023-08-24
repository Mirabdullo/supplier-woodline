import { Op } from "sequelize";
import { createProductDto } from "../dto/product.dto";
import { HttpExeption } from "../httpExeption/httpExeption";
import { Company } from "../model/company.model";
import { FurnitureType } from "../model/furnitureType.model";
import { Models } from "../model/model.model";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";
import { Warehouse } from "../model/warehouse.model";
import { User } from "../model/user.model";

class ProductService {
    private ProductModel: typeof Product = Product
    private Warehouse: typeof Warehouse = Warehouse
    private User: typeof User = User

    public async getProduct(id: string) {
        const user = await this.User.findByPk(id)

        return await this.ProductModel.findAll({
            where: {
                '$order.status$': 'NEW',
                '$order.model.company.id$': user.comp_id
            },
            include: [
                {
                    model: Warehouse
                },
                {
                    model: Order,
                    as: "order",
                    include: [
                        {
                            model: Models,
                            include: [
                                {
                                    model: Company,
                                },
                                {
                                    model: FurnitureType
                                }
                            ]
                        },

                    ]
                }
            ]
        })
    }

    public async postProduct(data: createProductDto) { 
        const warehouse = await this.Warehouse.findOne({ where: { id: data.warehouse_id } })
        if (!warehouse) {
            throw new HttpExeption(404, "Warehouse not found")
        }


        return await this.ProductModel.create(data)
    }



}

export default ProductService